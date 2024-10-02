import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import CredentialsProvider from "next-auth/providers/credentials";
import { LOGIN, REFRESH_TOKEN } from '@/graphql/mutations';

export const client = new ApolloClient({
    link: createHttpLink({
      uri: process.env.NOTATIONS_GQL_URL,
    }),
    cache: new InMemoryCache(),
 });
  
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Sign-in',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password" }
            },
            session: {
                jwt: true,
                maxAge: 3 * 60 * 60 // 3 hours.
            },
            jwt: {
                secret: process.env.NOTATIONS_SECRET,
                maxAge: 60 * 60 // 1 hour.
            },
            async authorize(credentials) {
                const { username, password } = credentials;
                const { data } = await client.mutate({
                    mutation: LOGIN,
                    variables: { username, password },
                });

                const user = data?.login?.user;
                const token = data?.login?.user?.jwtAuthToken;

                // If no error and we have user data, return it.
                if (user) {
                    return {
                        user
                    }
                }
                // Return null if user data could not be retrieved.
                return null;
            }
        }),
    ],
    pages: {
        signIn: '/',
        error: '',
    },
    secret: process.env.NOTATIONS_SECRET,
    callbacks: {
        signIn: async ({ user }) => {
            return user;
        },

        async jwt({ token, user }) {
            // Initial call.
            if (user) {
                const authToken = user.jwtAuthToken;
                const refreshToken = user.jwtRefreshToken;
                const authExpiration = user.jwtAuthExpiration;

                delete user.jwtAuthToken;
                delete user.jwtRefreshToken;
                delete user.jwtAuthExpiration;

                return {
                    accessToken: user.jwtAuthToken,
                    accessTokenExpires: user.jwtAuthExpiration,
                    refreshToken: user.jwtRefreshToken,
                    user: user.user,
                }
            }
            // For subsequent calls.

            // Return previous token if the access token has not expired yet.
            if (Date.now() < token.accessTokenExpires) {
                return token
            }

            // Access token has expired, try to update it.
            return refreshAccessToken(token)
        },
        async session(session) {
            session.name = session.token.user.firstName
            session.accessToken = session.token.accessToken
            session.refreshToken = session.token.refreshToken
            return session;
        }

    }
}

export const refreshAccessToken = async (token) => {
    const { data } = await client.mutate({
        mutation: REFRESH_TOKEN,
        variables: { token: token?.user?.jwtRefreshToken },
    });

    const refreshedToken = data?.refreshJwtAuthToken?.authToken;
    if (refreshedToken) {
        return {
            ...token,
            accessToken: refreshedToken
        }
    } else {
        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import CredentialsProvider from "next-auth/providers/credentials";
import { LOGIN, REFRESH_TOKEN } from '@/graphql/mutations';
import { use } from 'react';

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
            async authorize(credentials) {
                const { username, password } = credentials;
                const { data } = await client.mutate({
                    mutation: LOGIN,
                    variables: { username, password },
                });
                const user = data?.login?.user;
                if (user) {
                    return { ...user };
                }
                return null;
            }
        }),
    ],
    pages: {
        signIn: '/',
        error: '',
    },
    secret: process.env.NOTATIONS_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 3 * 60 * 60 // 3 hours - Force session end, logout after 3 hours.
    },
    callbacks: {
        async jwt({ token, user, trigger }) {
            if (trigger === "update") {
                const newToken = await refreshAccessToken(token);
                token.accessToken = newToken;
                token.expires = Date.now() + 55 * 1000;
            }

            if (user) {
                // This case handles initial sign in
                token.accessToken = user.jwtAuthToken;
                token.refreshToken = user.jwtRefreshToken;
                token.expires = user.jwtAuthExpiration;
            }

            // Check if the token is expired
            if (Date.now() >= token.expires) {
                const newToken = await refreshAccessToken(token);
                token.accessToken = newToken;
                token.expires = Date.now() + 55 * 1000; 
            }

            return token;
        },
        async session({ session, token }) {    
            session.accessToken = token.accessToken;
            session.expires = token.expires;
            return session;
        }
    }
};

export const refreshAccessToken = async (token) => {
    try {
        const { data } = await client.mutate({
            mutation: REFRESH_TOKEN,
            variables: { token: token.refreshToken },
        });

        const refreshedToken = data?.refreshJwtAuthToken?.authToken;
        if (refreshedToken) {
            return refreshedToken;
        } else {
            throw new Error("Failed to refresh token");
        }
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
};
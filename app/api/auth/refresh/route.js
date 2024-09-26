import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Set up the client. 
const httpLink = createHttpLink({
    uri: `${process.env.WP_GQL_URL}`,
  });
  
  const authLink = setContext((_, { headers }) => {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    return {
      headers: {
        ...headers,
        authorization: refreshToken ? `Bearer ${refreshToken}` : "",
      }
    };
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
  

  const GET_USER = gql`
    query Viewer {
    viewer {
        capKey
        capabilities
        databaseId
        description
        email
        extraCapabilities
        firstName
        id
        isComment
        isContentNode
        isFrontPage
        isJwtAuthSecretRevoked
        isPostsPage
        isRestricted
        isTermNode
        jwtAuthExpiration
        jwtAuthToken
        jwtRefreshToken
        jwtUserSecret
        lastName
        locale
        name
        nicename
        nickname
        registeredDate
        shouldShowAdminToolbar
        slug
        uri
        url
        userId
        username
    }   
    }`;

export async function POST(request) {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
        return new Response(JSON.stringify({ error: 'No refresh token found' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
        });
    }

    // Get new token from GQL server.
    try {
        const { data } = await client.mutate({
            mutation: gql`
                mutation RefreshToken($input: RefreshJwtAuthTokenInput!) {
                    refreshJwtAuthToken(input: $input) {
                    authToken
                    }
                }
            `,
            variables: { input: {
                jwtRefreshToken: refreshToken,
            } },
        }); 

        // Get user data from GQL server.
        const { data: veiwer, error } = await client.query({ query: GET_USER });  
        
        // Return new token to store in session storage or browser memory.
        return NextResponse.json( {
             token: data?.refreshJwtAuthToken?.authToken,
             user: veiwer?.viewer
        });
    } catch (error) {
       // console.log(error);
        return NextResponse.json({ message: 'Authentication failed' }, { status: 401 });
    }
}
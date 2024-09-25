import { NextResponse } from 'next/server';
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';

// Set up the client. 
const client = new ApolloClient({
  link: createHttpLink({
    uri: `${process.env.WP_GQL_URL}`,
  }),
  cache: new InMemoryCache(),
});

// Handle POST request to /api/login.
// Take in request with username and password. 
// Open a new client connection to the WP GraphQL endpoint.
// Use the login mutation to get the user data.
// Return the user data, so it can be used in the client.
export async function POST(request) {

  const { username, password } = await request.json(); 

  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation login($password: String!, $username: String!) {
          login(input: {password: $password, username: $username }) {
            user {
              id
              email
              name
              username
              userId
              roles {
                nodes {
                  capabilities
                  isRestricted
                  id
                }
                edges {
                  node {
                    capabilities
                  }
                }
              }
              capabilities
              firstName
              jwtAuthToken
              lastName
              nicename
              nickname
            }
          }
        }
      `,
      variables: { username, password },
    });
    return NextResponse.json(data?.login?.user);
  } catch (error) {
    console.log( error );
    return NextResponse.json({ message: 'Authentication failed' }, { status: 401 });
  }
}
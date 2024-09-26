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
// Set login cookies and return the user data,
// so it can be used in the client.
export async function POST(request) {
  const { username, password } = await request.json();
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation login($password: String!, $username: String!) {
          login(input: {password: $password, username: $username }) {
            user {
              id
              userId
              firstName
              jwtAuthToken
              jwtRefreshToken
            }
          }
        }
      `,
      variables: { username, password },
    });

    // Extra data into variables.
    const user = data?.login?.user;
    const token = data?.login?.user?.jwtAuthToken;
    const refreshToken = data?.login?.user?.jwtRefreshToken;

    // Set the response. 
    const response = NextResponse.json({
      user,
      token,
    });

    // Set the refresh token as an HTTP-only cookie to send
    // with response.
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });
    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Authentication failed' }, { status: 401 });
  }
}
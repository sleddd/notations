import { NextResponse } from 'next/server';
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';

// Set up the client. 
const client = new ApolloClient({
  link: createHttpLink({
    uri: `${process.env.WP_GQL_URL}`,
  }),
  cache: new InMemoryCache(),
});

export async function POST() {
  try {
    const { data } = await client.mutate({
      mutation: gql`mutation Logout {
      logout(input: {}) {
        status
      }
	  }
  `,});

    // Set the response.
    const response = NextResponse.json(data?.logout);

    // Delete refreshToken cookie on server side.
    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 0,
    });
    response.cookies.set('wp-settings-time-1', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.log( error );
    return NextResponse.json({ message: 'Authentication failed' }, { status: 401 });
  }
}
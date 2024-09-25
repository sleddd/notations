import { NextResponse } from 'next/server';
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';

// Set up the client. 
const client = new ApolloClient({
  link: createHttpLink({
    uri: `${process.env.WP_GQL_URL}`,
  }),
  cache: new InMemoryCache(),
});

export async function POST(request) {
  try {
    const { data } = await client.mutate({
      mutation: gql`mutation Logout {
      logout(input: {}) {
        status
      }
	  }
  `,});
    return NextResponse.json(data?.logout);
  } catch (error) {
    console.log( error );
    return NextResponse.json({ message: 'Authentication failed' }, { status: 401 });
  }
}
'use client';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useSession } from 'next-auth/react';

const httpLink = new HttpLink({
  uri: process.env.NOTATIONS_GQL_URL,
});

const ApolloProviderWrapper = ({ children }) => {

  const session  = useSession();

  const authMiddleware = setContext(async (_, { headers }) => {
    const token = session?.data?.token?.accessToken;
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    }

    return { headers };

  });

  const client = new ApolloClient({
    link: from([authMiddleware, httpLink]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
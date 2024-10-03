// lib/apollo-provider.js
'use client';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const httpLink = new HttpLink({
  uri: process.env.NOTATIONS_GQL_URL,
});

const ApolloProviderWrapper = ({ children }) => {
  const { data: session, update } = useSession();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const authMiddleware = setContext(async (_, { headers }) => {
      if (session?.error === "RefreshAccessTokenError") {
        return { headers };
      }

      const token = session?.accessToken;
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

    const newClient = new ApolloClient({
      link: from([authMiddleware, httpLink]),
      cache: new InMemoryCache(),
    });

    setClient(newClient);
  }, [session]);

  if (!client) {
    return null;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
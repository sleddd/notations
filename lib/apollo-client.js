'use client';
import { ApolloClient, ApolloProvider, InMemoryCache, from, HttpLink } from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { setContext } from '@apollo/client/link/context';
import { update, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const uploadLink = createUploadLink({
  uri: process.env.NOTATIONS_GQL_URL,
  include: 'credentials'
});

const ApolloProviderWrapper = ({ children }) => {
  const { data: session, update, status } = useSession();
  const [client, setClient] = useState(null);
  const token = session?.accessToken;
    
  useEffect(() => {
    const authLink = setContext(async (_, { headers }) => {
      if (session?.accessToken) {
        return {
          headers: {
            ...headers,
            authorization: `Bearer ${session.accessToken}`,
          },
        };
      }
      return { headers };
    });

    const newClient = new ApolloClient({
      link: from([authLink, uploadLink]),
      cache: new InMemoryCache(),
    });

    setClient(newClient);
  }, [session]);

  // Refresh token when authenticated, but token expired.
  if ( Date.now() >= session?.expires ) {
    update();
  }

  if (!client) {
    return null;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};


export default ApolloProviderWrapper;
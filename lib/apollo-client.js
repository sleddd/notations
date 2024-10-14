'use client';
import { ApolloClient, ApolloProvider, InMemoryCache, from } from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { ApolloLink } from '@apollo/client/core';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const uploadLink = createUploadLink({
  uri: process.env.NOTATIONS_GQL_URL,
  include: 'credentials'
});

const ApolloProviderWrapper = ({ children }) => {
  const { data: session, update } = useSession();
  const [client, setClient] = useState(null);
  const token = session?.accessToken;

  useEffect(() => {
    const authLink = new ApolloLink( (operation, forward) => {
      if (Date.now() > session?.accessExpires) {
        update();
        console.log('Token Expired: Refreshing...');
      }
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      });
      return forward(operation);
    });

    const newClient = new ApolloClient({
      link: from([authLink, uploadLink]),
      cache: new InMemoryCache(),
    });

    setClient(newClient);
  }, [token]);

  if (!client) {
    return null;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getToken } from './auth';

// Sets Apollo Client to use the WP GraphQL endpoint.
// The authLink adds the token to the request headers.
// It uses the getToken function to get the token from the session.
// The client is exported for use in the AuthProvider.
// For server side components ( i.e. children use the client directly. )

const httpLink = createHttpLink({
  uri: `${process.env.WP_GQL_URL}`,
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    ssrMode : true,
    connectToDevTools: true,
});
  
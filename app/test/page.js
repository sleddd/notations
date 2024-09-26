import AuthWrapper from '@/components/AuthWrapper';
import Link from 'next/link';
import { client } from '@/lib/apollo-client';
import { gql, useQuery } from '@apollo/client';

const CURRENT_USER = gql`
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

export default function Test() {
  const {data, error, loading} = client.query({ query: CURRENT_USER });
  //const {data, error, loading} = useQuery(CURRENT_USER);
  console.log('testing');
  console.log( data, error, loading );
  return (
    <AuthWrapper>
      <main>
        <h1>Welcome to My Test App</h1>
        <Link href="/">Home</Link>
      </main>
    </AuthWrapper>
  );
}
import { gql } from '@apollo/client';

export const GET_USER = gql`
  query getUser {
    viewer {
      email
      avatar {
        url
      }
      firstName
      id
      name
      nicename
      userId
      username
    }
  }
`;
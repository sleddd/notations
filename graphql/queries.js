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


export const GET_POST_BY_DAY = gql`query getPostsByDay($year: Int = 2024, $month: Int = 9, $day: Int = 27) {
  posts(
    where: {status: PRIVATE, dateQuery: {year: $year, month: $month, day: $day}}
  ) {
    edges {
      node {
        id
        postId
        title
        content
      }
    }
  }
}`;
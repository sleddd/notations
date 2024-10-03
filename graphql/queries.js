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


export const GET_POSTS_BY_DAY = gql`query getPostsByDay($year: Int, $month: Int, $day: Int) {
  posts(
    where: {orderby: { field: DATE, order: ASC }, status: PRIVATE, dateQuery: {year: $year, month: $month, day: $day}}
  ) {
    edges {
      node {
        id
        postId
        title
        content
        categories {
          edges {
            node {
              slug
            }
          }
        }
        postFormats {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  }
}`;
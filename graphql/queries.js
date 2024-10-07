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


export const GET_POSTS_BY_DAY = gql`query getPostsByDay($year: Int, $month: Int, $day: Int, $author: Int) {
  posts(
    where: {
    orderby: { field: DATE, order: ASC },
    dateQuery: {year: $year, month: $month, day: $day}
    stati: [PRIVATE, PUBLISH] 
    author: $author
    }
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
        featuredImage { 
          node {
            link
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
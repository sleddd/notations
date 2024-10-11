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
  collections {
    edges {
      node {
        collectionId
        name
        slug
      }
    }
  }
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
        meta {
          key, 
          value
        }
        collections {
          edges {
            node {
              collectionId
              name
              slug
              uri
            }
          }
        }
      }
    }
  }
}`;


export const GET_COLLECTIONS = gql`
  query GetCollections {
    collections {
      edges {
        node {
          collectionId
          name
          slug
        }
      }
    }
  }
`;



export const GET_POSTS_BY_COLLECTION = gql`
  query GetCollections($slug: [String!]) {
    collections(where: { slug: $slug }) {
      nodes {
         posts (where: {stati: [PRIVATE, PUBLISH]}) {
          edges {
            node {
              # Basic post information
              id
              postId
              title
              content

              # Associated collections
              collections {
                edges {
                  node {
                    collectionId
                    name
                    slug
                  }
                }
              }

              # Categories of the post
              categories {
                edges {
                  node {
                    slug
                  }
                }
              }

              # Featured image
              featuredImage { 
                node {
                  link
                }
              }

              # Post formats
              postFormats {
                edges {
                  node {
                    name
                  }
                }
              }

              # Meta information
              meta {
                key
                value
              }
            }
          }
        }
      }
    }
  }
`;
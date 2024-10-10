import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation login($password: String!, $username: String!) {
login(input: {password: $password, username: $username }) {
    user {
    userId
    name
    email
    avatar {
      url
    }
    jwtAuthToken
    jwtRefreshToken
    jwtAuthExpiration
    }
}
}`;

export const LOGOUT = gql`
	mutation Logout {
		logout(input: {}) {
			status
		}
	}
`;

export const REFRESH_TOKEN = gql`
mutation refreshJwtAuthToken($token: String!) {
    refreshJwtAuthToken(input: {jwtRefreshToken: $token}) {
        authToken
    }
}`;


export const CREATE_POST = gql`
    mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
        post {
          postId
          title
          content
          date
        }
    }
}`;

export const DELETE_POST = gql`
  mutation DeletePost($input: DeletePostInput!) {
    deletePost(input: $input) {
      deletedId
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
      post {
        id
        title
        content
      }
    }
  }
`;


export const UPDATE_POST_META = gql`
  mutation UpdatePostMeta($input: UpdatePostMetaInput!) {
    updatePostMeta(input: $input) {
      status
    }
  }
`;

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(input: { file: $file }) {
      mediaItem {
        id
        databaseId
        sourceUrl
      }
    }
  }
`;

export const SET_FEATURED_IMAGE = gql`
mutation SetFeaturedImage($postId: ID!, $imageId: ID!) {
  setFeaturedImage(input: { postId: $postId, imageId: $imageId }) {
    success
  }
}`;
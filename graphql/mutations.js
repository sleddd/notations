import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation login($password: String!, $username: String!) {
login(input: {password: $password, username: $username }) {
    user {
    id
    userId
    firstName
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


export const CREATE_BLANK_POST = gql`
    mutation CreateBlankPost($input: CreatePostInput!) {
    createPost(input: $input) {
        post {
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

export const CREATE_MEDIA_ITEM = gql`
  mutation CreateMediaItem($file: Upload!, $title: String!) {
    createMediaItem(input: { file: $file, title: $title, status: PUBLISH }) {
      mediaItem {
        id
        sourceUrl
      }
    }
  }
`;
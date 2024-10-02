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
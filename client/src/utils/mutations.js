import gql from 'graphql-tag'

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user{
                _id
                username
            }
        }
    }
`

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`

export const SAVE_BOOK = gql`
    mutation saveBook($title: String!, $authors: [String]!, $description: String!, $bookId: String!, $image: String!, $link: String!) {
        saveBook(title: $title, authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link) {
            savedBooks {
                title
                authors
                description
                bookId
                image
                link
            }
        }
    }
`

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            savedBooks {
                bookId
            }
        }
    }
`
import {buildSchema} from "graphql";

export default buildSchema(`
    type Post{
        title: String!
        description: String!
        date: String!
    }

    input inputPost{
        title: String!
        description: String!
        date: String!
    }

    input User{
        username: String!
        password: String!
        email: String
    }

    type Query{
        getPosts: [Post!]
    }

    type Mutation{
        insertPost(post: inputPost!): Post!
        signUp(user: User!): Boolean
        logIn(user: User!): String!
    }

    schema{
        query: Query
        mutation: Mutation
    }
`);
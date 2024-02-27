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

    type Query{
        getPosts: [Post!]
    }

    type Mutation{
        insertPost(post: inputPost!): Post!
    }

    schema{
        query: Query
        mutation: Mutation
    }
`);
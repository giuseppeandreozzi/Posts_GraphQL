import {buildSchema} from "graphql";

export default buildSchema(`
    type Post{
        title: String!
        description: String!
        date: String!
    }

    type Query{
        getPosts: [Post!]
    }

    schema{
        query: Query
    }
`);
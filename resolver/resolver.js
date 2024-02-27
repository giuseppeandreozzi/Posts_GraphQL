import Post from "../model/post.js";

export default {
    getPosts: async () => {
        let posts = await Post.find();
        var arrayPosts = [];
        for(let el of posts) {
            arrayPosts.push({
                title: el.title,
                description: el.description,
                date: el.date.toString()
            });
        }

        return arrayPosts;
    },
    insertPost: async ({post}, req) => {
        var newPost = new Post({
            title: post.title,
            description: post.description,
            date: post.date
        });

        var postSaved = await newPost.save();

        return {title: postSaved.title, description: postSaved.description, date: postSaved.date.toString()};
    }
};
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
    }
};
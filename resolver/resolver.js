import Post from "../model/post.js";
import User from "../model/user.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        let token = req.get("Authorization").split(" ")[1];

        try{
            var tokenDecoded = jwt.verify(token, process.env.PK_JWT);
        } catch(err){
           throw new Error("Non sei autenticato.");
        }

        var newPost = new Post({
            title: post.title,
            description: post.description,
            date: post.date
        });

        var postSaved = await newPost.save();

        return {title: postSaved.title, description: postSaved.description, date: postSaved.date.toString()};
    },
    signUp: async ({user}, req) => {
        const passwordHashed = await bcrypt.hash(user.password, parseInt(process.env.NUMSALT));

        const newUser = User({
            username: user.username,
            password: passwordHashed,
            email: user.email
        });

        try{
            await newUser.save();
            return true;
        } catch(e){
            throw new Error("Errore nella registrazione");
        }

    },
    logIn: async ({user}, req) => {

        try{
           const userFounded = await User.find({username: user.username});
           const isPasswordEqual = await bcrypt.compare(user.password, userFounded[0].password);

           if(isPasswordEqual){
                return jwt.sign({idUser: userFounded._id}, process.env.PK_JWT, {expiresIn: '1h'});
           }
        } catch(e){
            console.log(e)
            throw new Error("Errore nel log-in");
        }
    }
};
import mongoose,{Schema} from "mongoose";
// import User from "./user";

const postSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    postImage:{
        type:String,
        required: true
    }
})

const Post = mongoose.model("post",postSchema)
export default Post
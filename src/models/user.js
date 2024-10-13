import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt'

const userSchema = new Schema ({
    Fullname:{
        type: String,
        required: true 
    },

    Username:{
        type: String,
        required: true,
        unique: true
    },

    EmailOrMobile:{
        type: String,
        required: true,
        unique: true
    },

    ProfilePic:{
        type: String,
        default:"https://res.cloudinary.com/da05006gl/image/upload/v1728641915/k26ibvlekjgz6go1jseb.png"
    },

    Password:{
        type: String,
        required: true,
        unique: true
    }
    
})
userSchema.pre("save", async function () {
    this.Password = await bcrypt.hash(this.Password, 12);
  });

const User = mongoose.model('User',userSchema);
export default User;
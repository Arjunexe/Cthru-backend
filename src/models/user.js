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
        default:"https://res.cloudinary.com/da05006gl/image/upload/v1734407310/ywkv9vho9dn3l7lehsyo.png"
    },

    Password:{
        type: String,
        required: true
        
    }
    
})
userSchema.pre("save", async function () {
    this.Password = await bcrypt.hash(this.Password, 12);
  });

const User = mongoose.model('User',userSchema);
export default User;
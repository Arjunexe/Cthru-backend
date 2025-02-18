import userModal from '../models/user.js'

export async function getAllUserHelper (){
    try {
    const allUsers = await userModal.find()        
    return allUsers;
        
    } catch (error) {
        console.log("error during getAllUserHelper: ", error);
        
    }


}
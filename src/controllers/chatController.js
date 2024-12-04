

export const getFollowing = async (req, res) => {
    try {

        const followingData = req.body
        console.log("here is the dataaaa:", followingData);
        
        
    } catch (error) {
        console.log("error during getFollowing:", error);
        
    }
}
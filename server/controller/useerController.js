import sql from "../config/db";

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();

    const creations =
      await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY crreated_at DESC`;
    res.json({ sucess: true, creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getPublishedCreations = async (req, res) => {
  try {
    

    const creations =
      await sql`SELECT * FROM creations WHERE publish=true ORDER BY crreated_at DESC`;
    res.json({ sucess: true, creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const toggleLikeCreation = async (req, res) => {
    try {
        
        const {userId} = req.auth();
        const {id} = req.body

        const [creation] = await sql`SELECT * FROM creations where id =${id} `

        if (!creation){
            return res.json({sucess:false, message:"Creation not found"})
        }
  
      const creations =
        await sql`SELECT * FROM creations WHERE publish=true ORDER BY crreated_at DESC`;
      
      const currentLikes = creation.currentLikes
      const userIdStr = userId.toString();
      let updatedLikes; 
      let message; 

      if(currentLikes.includes(userIdStr)){
        updatedLikes = currentLikes.filter((user) => user !== userIdStr)
        message = 'Creation Unliked'
      }

        res.json({ sucess: true, creations });


    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  };
  
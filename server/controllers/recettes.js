import Recette from "../models/recette.js";


export const getRecetteByUserId = async (req, res) => {
    // const {id} = req.params ;
    if(!req.userId) return res.status(404).send(`Not Authentificated`);
    try {    
          const chapitre = await Recette.find({user : req.userId})          
           res.status(200).json({ chapitre })
        } catch (error) {
            res.status(404).json({ "message": error })
        }

}

export const deleteRecetteById = async (req, res) => {
    const {id} = req.body ;
    try {    
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ "message": `No Recette with id: ${id}` });
        const recette = await  Recette.findByIdAndRemove(id)
         res.status(200).json({ recette })

        } catch (error) {
          res.status(404).json({ "message": error })
        }

}

export const updateRecette = async (req, res) => {
    const {id,nom, ingredients, etapes, duree, photo ,user} = req.body ;
    
    try {    
        if(!req.userId) return res.status(404).send(`Not Authentificated`);

        // Check if required fields are present and not empty
        if (!id || !nom || ingredients.length ===0 || etapes.length ===0 || !duree || !user) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        // Additional validation for specific fields
        if (nom.trim() === '') {
            return res.status(400).json({ message: 'Le nom de la recette ne peut pas être vide.' });
        }

        // if(req.userId !== user){ // just to make sure is updating his own recettes

        // }
           const updatedRecette =  await Recette.findByIdAndUpdate(id, { nom, ingredients, etapes, duree, photo } , {new:true})    
        
           return  res.status(200).json({ updatedRecette })
        } catch (error) {
            return  res.status(404).json({ "message": error })
        }

}


export const createRecette = async (req, res) => {

    const { nom, ingredients, etapes, duree, photo ,user } = req.body;
    try {
    
        const recette =  Recette.create({
            nom, ingredients, etapes, duree, photo ,user
        })

       return  res.status(200).json({ recette })
    } catch (error) {
        return res.status(404).json({ "message": error })
    }
  
  
  }
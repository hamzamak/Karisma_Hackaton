import mongoose from "mongoose";

const RecetteSchema = mongoose.Schema({
    nom : { type : String , required : true} ,
    ingredients : { type : [String] , required : true} ,
    etapes : { type : [String] , required : true} ,
    duree : { type : String , required : true} ,
    photo: { type : String } ,
    user: { type:  mongoose.Schema.Types.ObjectId ,ref : 'User' }, // Chaque utilisateur ne peut accéder qu'à ses propres recettes.

})
export default mongoose.model('Recette',RecetteSchema )


// nom ingredients etapes duree photo user
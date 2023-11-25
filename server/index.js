import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import morgan from "morgan";
import recettesRoutes from './routes/recettes.js'
import usersRoutes from './routes/users.js'
import dotenv from "dotenv";


const app = express();
dotenv.config();

app.use(express.json({limit : "30mb" ,extended : true}))
app.use(express.urlencoded({limit : "30mb" ,extended : true}))

app.use(cors())
app.use(morgan('tiny'))
//*************************************** */ 
app.use('/recettes',recettesRoutes);
app.use('/users',usersRoutes)

//*************************************** */
// mongodb connect
const MONGOOSE_URL = process.env.MONGOOSE_URL

const PORT = process.env.PORT || 5000 ;

mongoose.connect(MONGOOSE_URL )
.then(()=> app.listen(PORT, ()=> console.log(`Server Running from port ${PORT}`)))
.catch((err)=> console.log(err.message) )


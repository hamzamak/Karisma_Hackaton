import jwt from 'jsonwebtoken'

 const auth = async (req,res,next) => {

    try {
        const token = req.headers.authorization?.split(' ')[1] ;
        let decodeData ;
            decodeData = jwt.verify(token, process.env.SECRET) ;
            req.userId = decodeData?.payload?._id
            next();
    } catch (error) {
        res.status(401).json('Not Authentificated')
        console.log(error)
    }
}
export default  auth
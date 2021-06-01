import jwt from 'jsonwebtoken'

/*Let's create a function that generate a token
this is gonna take an Id as a payload for the token*/
const generateToken = (id) => {
    /**the payload is gonna be an object with id and
     * a secrete as a second argument and expireIn as a
     * third argument
    */
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export default generateToken
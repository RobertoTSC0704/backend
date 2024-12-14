import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

//Funcion para registrar usuarios
//req <- request sirve para recibir datos al navegador (front
//res <- response sirve para enviar datos al navegador (front)
export const register = async (req, res) => {
   const{username, email, password} = req.body;

    try {
        //validamos que el email no se haya registrado previamente
        const userFound = await User.findOne({email});
        if (userFound){ //si se encuetro el email en la base de datos 
            return res.status(400) //Mensaje no encontrado
                      .json({message:["El email ya esta en uso"]})}
 
        const passswordHash = await bcryptjs.hash(password,10);
        const newUser= new User({
            username,
            email,
            password:passswordHash
        });
        //if (!isMatch){
        //    return res.status(400).json({message:['Password no concide']})
        //}
        //console.log(newUser);
        //Insert into usarios(username, email, passsword) 
        //                      values $username, $email, $password
        const userSaved = await newUser.save();
        const token = await createAccessToken ({id: userSaved._id});
        res.cookie('token', token,{
            sameSite: 'none',
            secure: true
        
        });

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
        });
    } catch (error) {
        console.log(error);
    }
}; //Fin de Register


//Funcion para iniciar sesion
export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const userFound = await User.findOne({email});
        if(!userFound){
            return res.status(400)
                        .json({message: ['Usuario no encontrado']});
        }

        //Comparamos el password que envió el usuario con el de la bd
        const isMatch = await bcryptjs.compare(password, userFound.password)
        if(!isMatch){
            return res.status(400)
                      .json({message: ['Password no coincide']});
        }
        const token = await createAccessToken ({id: userFound._id})
        res.cookie('token', token,{
            sameSite: 'none',
            secure: true,
        
        });

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            password: userFound.password
        });

    } catch (error) {
        console.log(error);
    }
    
}; //Fin de login

//Funcion para cerrar sesion
export const logout = (req, res) => {
    res.clearCookie("token");
        //{expires: new Date(0),}
    return res.sendStatus(200);
}//Fin de logout

//Funcion para perfil del usuario
export const profile = async(req,res)=>{
    const userFound = await User.findById(req.user.id);

    if (!userFound)
        return res.status(400).json({message:["User not found"]});

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    })
}//Fin de profile

//Función para validar el token de inicio de sesión

export const verifyToken = async (req, res)=>{
    const {token} = req.cookies;
    
    if (!token) 
        return res.status(401).json({message: ["No autorizado"]});
    
    jwt.verify(token, TOKEN_SECRET, async (err, user)=>{
        if (err) //Si hay un error al validar el token 
        return res.status(401).json({message: ["No autorizado"]});
        
        const userFound = await User.findById(user.id);
        if (!userFound)//Si no encuentra el usuario que viene en el token 
            return res.status(401).json({message: ["No autorizado"]});
        
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        })//Fin del return res.json
    })//Fin del jwt.verify
}//Fin de verifyToken
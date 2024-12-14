import multer from 'multer';
import path from 'path';
import {v4 as uuid} from 'uuid';
import {fileURLToPath} from 'url';
import { url } from 'inspector'

const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(__filename);
 const storage = multer.diskStorage({
    destination: path.join(_dirname,'../public/img'),
    filename:(req,file,cb,filename)=>{
        cb(null,uuid()+path.extname(file.originalname));
    }
 });
 const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 2024 //5mb
    }
 }).single('image');

 export function uploadImage (req,res,next){
    upload(req,res,(err)=>{
        if (err){
            return res.status(500).json({message: ['error al subir la imagen']});
        }
        next();
    });
 }
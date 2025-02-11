import {Router, Request, Response} from 'express'
import { registerSchema } from '../validations/authValidations.js';
import { tryCatch } from 'bullmq';
import { ZodError } from 'zod';
import { formatError } from '../helper/formatErrors.js';
import prisma from '../config/database.js';
import bcrypt from 'bcrypt'

const router = Router()

//Register route

router.post('/register', async (req:Request, res: Response) => {
    
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);
        // res.json(payload)
        let user = await prisma.user.findUnique({
            where: {
                email:payload.email
            }
        })
        if(user){
            return res.status(422).json({
                errors: {
                    email: "Email already taken, please use another one."
                }
            })
        }
        //If user not exist then add it in DB, encrypt password
        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);

        //Create user with hash password
        await prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: payload.password,
            },
        })
        
        return res.json({msg: "User created successfully"})
        
    } catch (error) {
        if(error instanceof ZodError){
            const errors = formatError(error)
            return res.status(442).json({msg: "Invalid format", errors});

        }
        return res.status(500).json({msg: "Something went wrong while registering"});
    }

})

export default router;
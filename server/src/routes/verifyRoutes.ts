import { Router, Response, Request} from 'express'
import prisma from '../config/database.js';
const router = Router();

router.get('/verify-email', async (req: Request, res: Response) => {
    const {email, token} = req.query;
    console.log(`Email: ${email}, token: ${token}`)
    console.log(`verify-email route hit`)
    if(email && token){
         
        const user = await prisma.user.findUnique({
            where: {
                email: email as string,
            }
        })

        if(user){
            if(user.email_verify_token === token){
                console.log(`token verified`)

                //Null email token once user verified
                await prisma.user.update({
                    data:{
                        email_verify_token: null,
                        email_verified_at: new Date().toISOString()
                    },
                    where: {
                        email: email as string
                    }
                })

                //Redirect to login or front page of app
                return res.redirect(`${process.env.CLIENT_APP_URL}/login`)
            }
        }

    return res.redirect('/verify-error')

    }

    return res.redirect('/verify-error')
})

router.get('/verify-error', async (req: Request, res: Response) => {
    return res.render('auth/verifyEmailError')
})

export default router
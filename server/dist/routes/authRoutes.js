import { Router } from 'express';
import { registerSchema } from '../validations/authValidations.js';
import { ZodError } from 'zod';
import { formatError, renderEmailEjs } from '../helper/helper.js';
import prisma from '../config/database.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { emailQueue, emailQueueName } from '../jobs/emailJobs.js';
const router = Router();
//Register route
router.post('/register', async (req, res) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);
        // res.json(payload)
        let user = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        });
        if (user) {
            return res.status(422).json({
                errors: {
                    email: "Email already taken, please use another one."
                }
            });
        }
        //If user not exist then add it in DB, encrypt password
        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);
        //Create email token for email-verify
        const token = await bcrypt.hash(uuidv4(), salt);
        const url = `${process.env.APP_URL}/verify-email?email=${payload.email}&token=${token}`;
        //Send email for verification
        const emailBody = await renderEmailEjs("email_verify", { name: payload.name, url: url });
        await emailQueue.add(emailQueueName, {
            to: payload.email,
            subject: "VoteWar Email Verification",
            body: emailBody,
        });
        //Create user with hash password
        await prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: payload.password,
                email_verify_token: token,
            },
        });
        return res.json({ msg: "User created successfully" });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(442).json({ msg: "Invalid format", errors });
        }
        console.error(error);
        return res.status(500).json({ msg: "Something went wrong while registering" });
    }
});
export default router;

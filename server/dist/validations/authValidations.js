import { z } from "zod";
export const registerSchema = z
    .object({
    name: z
        .string({ message: "Name is required" })
        .min(3, { message: "Name must be 3 character long." }),
    email: z
        .string({ message: "Email is required" })
        .email({ message: "Please provide correct email." }),
    password: z
        .string({ message: "Password is required" })
        .min(6, { message: "Password must be 6 character long." }),
    confirm_password: z
        .string({ message: "Confirm Password is required" })
        .min(6, { message: "Confirm Password must be 6 character long." }),
})
    .refine((data) => data.password === data.confirm_password, {
    message: "Confirm Password not matched",
    path: ["confirm_password"],
});

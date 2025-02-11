import { ZodError } from "zod";

export const formatError = (error: ZodError):any => {
    let errors:any = {}
    error.errors?.map((issue) => {
        errors[issue.path?.[0]] = issue.message;
    })
    return errors;
}

// Previosly getting issue format
// {
//     "issues": [
//         {
//             "code": "invalid_type",
//             "expected": "string",
//             "received": "null",
//             "path": [
//                 "name"
//             ],
//             "message": "Name is required"
//         },
//         {
//             "code": "invalid_type",
//             "expected": "string",
//             "received": "null",
//             "path": [
//                 "email"
//             ],
//             "message": "Email is required"
//         },
//         {
//             "code": "invalid_type",
//             "expected": "string",
//             "received": "undefined",
//             "path": [
//                 "password"
//             ],
//             "message": "Password is required"
//         },
//         {
//             "code": "invalid_type",
//             "expected": "string",
//             "received": "undefined",
//             "path": [
//                 "confirm_password"
//             ],
//             "message": "Confirm Password is required"
//         }
//     ],
//     "name": "ZodError"
// }
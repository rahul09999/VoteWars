import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";
export const formatError = (error) => {
    let errors = {};
    error.errors?.map((issue) => {
        errors[issue.path?.[0]] = issue.message;
    });
    return errors;
};
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
export const renderEmailEjs = async (fileName, payload) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    // const html: string = await ejs.renderFile(__dirname + `/views/emails/${fileName}.ejs`, payload);
    const html = await ejs.renderFile(path.join(__dirname, '../views/emails', `${fileName}.ejs`), payload);
    return html;
};

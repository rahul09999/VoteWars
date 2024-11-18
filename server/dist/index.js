import express from 'express';
import path from 'path';
import ejs from "ejs";
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import 'dotenv/config';
import { sendMail } from './src/config/mail.js';
const app = express();
const PORT = process.env.PORT || 7000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
app.get('/', async (req, res) => {
    const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, { name: "Ironfist" });
    await sendMail("wawew21340@anypng.com", "Testing SMTP", html);
    return res.json({ msg: "Email sent successfully!!!" });
});
app.listen(PORT, () => console.log(`Server is running on port: localhost:${PORT}`));

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import 'dotenv/config';
const app = express();
const PORT = process.env.PORT || 7000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
app.get('/', (req, res) => {
    return res.render("welcome");
});
app.listen(PORT, () => console.log(`Server is running on port: localhost:${PORT}`));

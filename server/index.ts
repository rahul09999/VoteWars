import express, { Application, Request, Response } from "express";
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import "dotenv/config";
import { sendMail } from "./src/config/mail.js";
import Routes from "./src/routes/index.js"

const app: Application = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

// Routes
app.use(Routes)

app.get("/", async (req: Request, res: Response) => {
  const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, {
    name: "Ironfist",
  });
  // await sendMail("wawew21340@anypng.com", "Testing SMTP", html);
  await emailQueue.add(emailQueueName, {
    to: "nigip14347@intady.com",
    subject: "Testing email queue",
    body: html,
  });
  return res.json({ msg: "Email sent successfully!!!" });
});

// Jobs queue
import "./src/jobs/index.js";
import { emailQueue, emailQueueName } from "./src/jobs/emailJobs.js";

app.listen(PORT, () =>
  console.log(`Server is running on port: localhost:${PORT}`)
);

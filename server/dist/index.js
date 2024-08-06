import express from 'express';
import 'dotenv/config';
const app = express();
const PORT = process.env.PORT || 7000;
app.get('/', (req, res) => {
    return res.send("Sup from server...");
});
app.listen(PORT, () => console.log(`Server is running on port: localhost:${PORT}`));

import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import passport from "passport";
import env from "dotenv";
import authRoutes from "./routes/auth.routes.js"

env.config();

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(passport.initialize());

app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



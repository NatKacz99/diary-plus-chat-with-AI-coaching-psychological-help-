import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import passport from "passport";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(passport.initialize());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



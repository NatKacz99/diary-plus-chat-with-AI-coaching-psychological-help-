import express from "express";
import {addNote, displayUserNotes} from "./../controllers/notes.controller.js"

const router = express.Router();

router.post("/addNote", addNote);

router.get("/displayUserNotes", displayUserNotes);
export default router;
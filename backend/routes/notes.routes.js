import express from "express";
import {addNote, displayUserNotes, deleteNote} from "./../controllers/notes.controller.js"

const router = express.Router();

router.post("/addNote", addNote);

router.get("/displayUserNotes", displayUserNotes);

router.delete("/deleteNote", deleteNote);
export default router;
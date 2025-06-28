import express from "express";
import {addNote, displayUserNotes, deleteNote, updateNote} from "./../controllers/notes.controller.js"

const router = express.Router();

router.post("/addNote", addNote);

router.get("/displayUserNotes", displayUserNotes);

router.delete("/deleteNote", deleteNote);

router.put("/updateNote", updateNote);
export default router;
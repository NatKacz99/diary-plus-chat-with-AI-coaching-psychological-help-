import express from "express";
import passport from "passport";
import { authorizationGoogleScope, authGoogleCallback, signup, signin } from
  "./../controllers/auth.controller.js"

const router = express.Router();

router.get("/auth/google", authorizationGoogleScope);
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/signin" }), authGoogleCallback);

router.post("/signup", signup);
router.post("/signin", signin)

export default router;
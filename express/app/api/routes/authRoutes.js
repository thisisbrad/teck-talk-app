import { Router } from "express";
import passport from "passport";
import { signUp, signOut, signIn, signInFailure } from "../controllers/authController.js";

const router = Router();

router.post('/', passport.authenticate('local'), signIn, signInFailure);

router.post('/signup', signUp, passport.authenticate('local', signIn, signInFailure));

router.post('/signout', signOut);

export default router;
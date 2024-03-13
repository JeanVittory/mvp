import { Router } from "express";
import { authentication } from "../controllers/auth";

const authRouter = Router();

authRouter.get("/", authentication)


export { authRouter }
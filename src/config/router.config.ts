import { app } from "./express.config";
import { authRouter } from "../api/routes/authentication.route";

export const routesConfiguration = () =>{
    app.use('/api/auth', authRouter)
}


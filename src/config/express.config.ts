import express from "express"
import { routesConfiguration } from "./router.config"

export const app = express()

app.use(express.json())
routesConfiguration()
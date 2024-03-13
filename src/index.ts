import { app } from "./config/express.config";
import { PORT } from "./api/constants";

function init (): void{
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
}

init()
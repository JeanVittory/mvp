import { app } from './config/express.config';
import env from './config/dotenv.config';

function init(): void {
	app.listen(env.PORT, () => console.log(`Server running on port: ${env.PORT}`));
}

init();

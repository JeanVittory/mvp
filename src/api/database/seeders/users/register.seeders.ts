import users from './user.json';
import { encryptPassword } from '../../../utils/passwordEncryption.utils';
import { prisma } from '../../../../config/turso/turso.config';

const createUser = async () => {
	try {
		for (const user of users) {
			const { password, enterprise, userName, email } = user;
			const encryptedPassword = await encryptPassword(password);
			const { id } = await prisma.user.create({
				data: {
					enterprise,
					userName,
					email,
				},
			});
			savePassword(encryptedPassword, id);
		}
	} catch (error) {
		console.log('Error: createUser seeder...');
	}
};

const savePassword = async (encryptedPassword: string, id: string) => {
	try {
		await prisma.password.create({
			data: {
				pass: encryptedPassword,
				User: { connect: { id } },
			},
		});
	} catch (error) {
		console.log('Error: savePassword seeder...');
	}
};

createUser();

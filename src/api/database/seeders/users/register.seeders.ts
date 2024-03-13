import users from './user.json';
import { PrismaClient } from '@prisma/client';
import { encryptPassword } from '../../../utils/passwordEncryption.utils';

const prisma = new PrismaClient();

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
				user: { connect: { id } },
			},
		});
	} catch (error) {
		console.log('Error: savePassword seeder...');
	}
};

createUser();

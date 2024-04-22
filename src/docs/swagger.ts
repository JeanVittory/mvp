import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';
import { PORT } from '../api/constants';

const swaggerDefinition: OAS3Definition = {
	openapi: '3.0.0',
	info: {
		title: 'Cash Flow API Documentation',
		version: '1.0.0',
		description:
			'This API allows you to connect with services who can manage the flow cash of a small bussiness.',
	},
	servers: [{ url: `http://localhost:${PORT}` }],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
			refreshHeader: {
				type: 'apiKey',
				in: 'header',
				name: 'x-refresh-token',
			},
		},
		schemas: {
			login: {
				type: 'object',
				required: ['email', 'password'],
				properties: {
					email: {
						type: 'string',
					},
					password: {
						type: 'string',
					},
				},
			},
			jwtToken: {
				type: 'string',
				description: 'JWT Token obtained after successful login.',
			},
			jwtRefreshToken: {
				type: 'string',
				description: 'Refresh Token obtained after successful login.',
			},
			electronicPaymentFilterElement: {
				type: 'object',
				properties: {
					totalAmount: {
						type: 'string',
					},
					OperationType: {
						type: 'object',
						properties: {
							nameEn: {
								type: 'string',
							},
							nameEs: {
								type: 'string',
							},
						},
					},
					FinancialEntity: {
						type: 'object',
						properties: {
							name: {
								type: 'string',
							},
						},
					},
					debitNote: {
						type: 'string',
					},
					createdAt: {
						type: 'string',
					},
					type: {
						type: 'string',
					},
				},
			},
		},
	},
};
const swaggerOptions: OAS3Options = {
	swaggerDefinition,
	apis: ['src/api/routes/*.ts'],
};

export default swaggerJSDoc(swaggerOptions);

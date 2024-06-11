export const PORT = 4000;

export const ACCESS_TOKEN_EXP_TIME = '1m';
export const REFRESH_TOKEN_EXP_TIME = '5m';
export const ACCESS_TOKEN_EXP_COOKIE_TIME = 60;
export const REFRESH_TOKEN_EXP_COOKIE_TIME = 300;

export const EGRESO = 'Egreso';
export const OUTCOME = 'Outcome';
export const ELECTRONIC_PAYMENT = 'Electronic Payment';
export const INGRESO_ELECTRONICO = 'Ingreso Electrónico';
export const INGRESO_EFECTIVO = 'Ingreso en Efectivo';
export const CASH_PAYMENT = 'Cash Payment';

export const TRANSFERENCE = 'Transference';
export const TRANSFERENCIA = 'Transferencia';
export const DEBIT = 'Debit';
export const DEBITO = 'Débito';

export const NEQUI = 'Nequi';
export const DAVIPLATA = 'Daviplata';
export const BANCOLOMBIA = 'Bancolombia';

export const OK = 200;
export const CREATED = 201;
export const OK_WITH_NO_RESPONSE = 204;

export const DEFAULT_PAGINATION_PAGE = '1';
export const DEFAULT_PAGINATION_PAGE_SIZE = '10';

export const X_TOTAL_COUNT = 'X-Total-Count';


export const CORS_OPTIONS = {
    origin: 'http://localhost:3000', // this value must be replaced by the prodcution domain when the appplication is deployed
    credentials: true,
}
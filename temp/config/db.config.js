export const HOST = "localhost";
export const USER = "postgres";
export const PASSWORD = "admin";
export const DB = "todoapp";
export const dialect = "postgres";
export const pool = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
};
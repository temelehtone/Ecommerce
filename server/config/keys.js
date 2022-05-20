import dotenv from "dotenv"
import findConfig from "find-config";

dotenv.config({ path: findConfig(".env") })

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const CONNECTION_URL = process.env.CONNECTION_URL;
export const JWT_EXPIRE = process.env.JWT_EXPIRE;
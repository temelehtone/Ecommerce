import dotenv from "dotenv"
import findConfig from "find-config";

dotenv.config({ path: findConfig(".env") })

export const PORT = 5000;
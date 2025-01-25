import { config } from "dotenv";

export const environment = config({ path: ".local/.env" }).parsed!;

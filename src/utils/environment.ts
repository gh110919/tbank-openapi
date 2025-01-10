import { config } from "dotenv";

const { parsed } = config({ path: ".local/.env" });

export const environment = parsed!;

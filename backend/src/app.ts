import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { userRoute } from "./routes";
import { clientRoute } from "./routes/client.route";

dotenv.config();

export const app: Express = express();
export const port = process.env.PORT || 3003;

app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/client", clientRoute);

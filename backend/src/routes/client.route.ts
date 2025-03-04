import express from "express";
import { ClientController } from "../controller/index";
import { ClientBusiness } from "../business/index";
import { ClientData } from "../data/client.data";
import { TokenValidator } from "../middlewares";
import { ClientValidations } from "../helpers/clientValidations.helpers";

const clientRoute = express.Router();

const clientBusiness = new ClientBusiness(
  new ClientData(),
  new ClientValidations()
);

const clientController = new ClientController(clientBusiness);
const tokenValidator = new TokenValidator();

clientRoute.use("/", tokenValidator.validate);

clientRoute.post("/create", clientController.createClient);
clientRoute.get("/get", clientController.getClientById);
clientRoute.put("/update", clientController.updateClient);
clientRoute.delete("/delete", clientController.deleteClient);

export { clientRoute };

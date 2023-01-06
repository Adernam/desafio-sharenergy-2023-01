import express from "express";
import { UserBusiness } from "../business";
import { UserController } from "../controller";
import { UserData } from "../data";
import { UserValidations } from "../helpers";
import { TokenValidator } from "../middlewares";
import { HashManager, Authenticator, IdGenerator } from "../services";

const userRoute = express.Router();

const userBusiness = new UserBusiness(
  new UserData(),
  new IdGenerator(),
  new HashManager(),
  new Authenticator(),
  new UserValidations()
);

const userController = new UserController(userBusiness);
const tokenValidator = new TokenValidator();

userRoute.post("/login", userController.login);
userRoute.post("/signup", userController.signup);

userRoute.use("/", tokenValidator.validate);
export { userRoute };

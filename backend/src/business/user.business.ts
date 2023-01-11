import { UserData } from "../data";
import { UserValidations } from "../helpers";
import { Authenticator } from "../services";
import { HashManager, IdGenerator } from "../services/";
import { User } from "../entity/user.entity";
import { userDTO } from "types/userDTO.type";

export class UserBusiness {
  constructor(
    private userData: UserData,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator,
    private userValidations: UserValidations
  ) {}

  signup = async (input: userDTO) => {
    const { username, password } = input;

    this.userValidations.validate(input);

    const registeredUser = await this.userData.getUserByName(username);

    if (registeredUser) {
      throw new Error("User already exists!");
    }

    const idUser = this.idGenerator.generateId();
    const hashedPassword = await this.hashManager.hash(password);
    const user: userDTO = {
      username,
      password: hashedPassword,
    };

    await this.userData.createUser(user);

    const token: string = this.authenticator.generateToken({ idUser });

    return token;
  };

  login = async (user: userDTO): Promise<string> => {
    const { username, password } = user;

    if (!username || !password) {
      throw new Error('Fill in filds "username" and "password"');
    }

    const loadedUser: User = await new UserData().getUserByName(username);

    if (!loadedUser) {
      throw new Error("User not found. Do you already have an account ?");
    }

    const comparePass = await this.hashManager.compare(
      password,
      loadedUser.password
    );

    if (!comparePass) {
      throw new Error("Invalid username or password!");
    }

    const token: string = this.authenticator.generateToken({
      idUser: loadedUser.id,
    });

    return token;
  };
}

import { userDTO } from "types/user-login.type";
import { dataSource } from "../data-source";
import { User } from "../entity/user.entity";

export class UserData {
  createUser = async (user: userDTO) => {
    const { username, password } = user;

    try {
      const newUser = new User();
      newUser.username = username;
      newUser.password = password;
      const result = await dataSource.getMongoRepository(User).save(newUser);

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Database error !");
      }
    }
  };

  getUserByName = async (username: string): Promise<User> => {
    try {
      const result = await dataSource
        .getMongoRepository(User)
        .findOneBy({ username });

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Database error !");
      }
    }
  };
}

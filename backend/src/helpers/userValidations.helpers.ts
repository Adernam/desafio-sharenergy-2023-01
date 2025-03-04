import { userDTO } from "../types/userDTO.type";

export class UserValidations {
  private passContainsSymbol(pass: string) {
    return /[!@#$%^&*]/.test(pass);
  }

  private passContainsNumber(pass: string) {
    return /[0-9]/.test(pass);
  }

  validate(input: userDTO) {
    const { username, password } = input;

    if (![username, password]) {
      throw new Error("Please check the username field.");
    }

    if (username.length < 3) {
      throw new Error("Username must contain at least 3 characters.");
    }

    if (password.length < 8) {
      throw new Error("Password must contain at least 8 characters.");
    }

    if (!this.passContainsSymbol(password)) {
      throw new Error(
        "The password must contain at least one special character."
      );
    }

    if (!this.passContainsNumber(password)) {
      throw new Error("The password must contain at least one number.");
    }
  }
}

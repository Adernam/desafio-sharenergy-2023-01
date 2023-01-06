import { ClientDTO } from "types/clientDTO.type";

export class ClientValidations {
  validate(input: ClientDTO) {
    const { username, email, phone, address, cpf } = input;

    if (![username, email, phone, address, cpf]) {
      throw new Error("Please check the username field.");
    }

    if (username.length < 3) {
      throw new Error("Username must contain at least 3 characters.");
    }

    if (cpf.length < 11) {
      throw new Error("Invalid CPF.");
    }
  }
}

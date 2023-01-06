import { ClientDTO } from "types/clientDTO.type";
import { dataSource } from "../data-source";
import { Client } from "../entity/client.entity";

export class ClientData {
  createClient = async (client: ClientDTO) => {
    const { username, email, phone, address, cpf } = client;

    try {
      const newClient = new Client();
      newClient.username = username;
      newClient.email = email;
      newClient.phone = phone;
      newClient.address = address;
      newClient.cpf = cpf;

      const result = await dataSource
        .getMongoRepository(Client)
        .save(newClient);

      return result;
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Database error !");
      }
    }
  };

  getClients = async (): Promise<Client[]> => {
    try {
      const result = await dataSource.getMongoRepository(Client).find();

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Database error !");
      }
    }
  };

  getClientById = async (id: string): Promise<Client> => {
    try {
      const client = await dataSource.getMongoRepository(Client).findOneBy(id);

      return client;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Database error !");
      }
    }
  };

  getClientByCpf = async (cpf: string): Promise<Client> => {
    try {
      const result = await dataSource.getMongoRepository(Client).findOneBy(cpf);

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Database error !");
      }
    }
  };

  updateClient = async (client: Client): Promise<Client> => {
    const { id, username, email, phone, address, cpf } = client;
    try {
      const client = await dataSource.getMongoRepository(Client).findOneBy(id);

      client.username = username;
      client.email = email;
      client.phone = phone;
      client.address = address;
      client.cpf = cpf;

      await dataSource.getMongoRepository(Client).save(client);

      return client;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Database error !");
      }
    }
  };

  deleteClient = async (id: string): Promise<void> => {
    try {
      await dataSource.getMongoRepository(Client).delete(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Database error !");
      }
    }
  };
}

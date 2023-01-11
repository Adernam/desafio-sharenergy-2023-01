import { ClientData } from "../data/client.data";
import { set, get } from "../util/redisConfig";
import { ClientDTO } from "types/clientDTO.type";
import { Client } from "../entity/client.entity";
import { ClientValidations } from "helpers";

export class ClientBusiness {
  constructor(
    private clientData: ClientData,
    private clientValidations: ClientValidations
  ) {}

  createClient = async (client: ClientDTO): Promise<Client> => {
    const { username, email, phone, address, cpf } = client;

    this.clientValidations.validate(client);

    if (!username || !email || !phone || !address || !cpf) {
      throw new Error("Please check all the fields.");
    }

    const registeredClient = await this.clientData.getClientByCpf(cpf);

    if (registeredClient) {
      throw new Error("CPF already registered!");
    }

    const clientDone: ClientDTO = {
      username,
      email,
      phone,
      address,
      cpf,
    };

    const newClient = await this.clientData.createClient(clientDone);

    const clientToRedis = await this.clientData.getClients();

    await set("redisClients", JSON.stringify(clientToRedis));

    return newClient;
  };

  getClients = async () => {
    const redisClientsString = await get("redisClients");

    if (redisClientsString == null) {
      const clients = await this.clientData.getClients();

      return clients;
    } else {
      return JSON.parse(redisClientsString);
    }
  };

  getClientById = async (id: string) => {
    const client = await this.clientData.getClientById(id);

    return client;
  };

  updateClient = async (client: Client) => {
    const { id, username, email, phone, address, cpf } = client;
    if (!id || !username || !email || !phone || !address || !cpf) {
      throw new Error("Please check the fields.");
    }

    const clientExists = await this.clientData.getClientById(id);

    if (!clientExists) {
      throw new Error("This client does not exist.");
    }

    const newClient: Client = { id, username, email, phone, address, cpf };

    const clientUpdatedSuccessfully = await this.clientData.updateClient(
      newClient
    );

    if (!clientUpdatedSuccessfully) {
      throw new Error("Database error.");
    }

    const clientsToRedis = await this.clientData.getClients();

    await set("redisClients", JSON.stringify(clientsToRedis));

    return newClient;
  };

  deleteClient = async (clientId: string): Promise<void> => {
    if (!clientId) {
      throw new Error("Please insert the client id to be delete.");
    }

    const clientExists = await this.clientData.getClientById(clientId);

    if (!clientExists) {
      throw new Error("This client does not exist.");
    }

    await this.clientData.deleteClient(clientId);

    const clientStillExisting = await this.clientData.getClientById(clientId);

    if (clientStillExisting) {
      throw new Error("Database error.");
    }

    const clientsToRedis = await this.clientData.getClients();

    await set("redisClients", JSON.stringify(clientsToRedis));
  };
}

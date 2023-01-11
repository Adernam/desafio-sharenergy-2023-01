import { Client } from "../entity/client.entity";
import { Request, Response } from "express";
import { ClientDTO } from "types/clientDTO.type";
import { ClientBusiness } from "../business/client.business";

export class ClientController {
  constructor(private clientBusiness: ClientBusiness) {}

  createClient = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, phone, address, cpf } = req.body;

      const client: ClientDTO = {
        username,
        email,
        phone,
        address,
        cpf,
      };

      const newClient = await this.clientBusiness.createClient(client);

      res.status(201).send({
        message: "Client registred successfully!",
        newClient,
      });
    } catch (error: any) {
      console.log(error);
      res.status(400).send(error.message || error.sqlMessage);
    }
  };

  getClients = async (req: Request, res: Response): Promise<void> => {
    try {
      const clients = await this.clientBusiness.getClients();

      res.status(200).send({ clients });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message || error.sqlMessage);
    }
  };

  getClientById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.body.id;

      const clients = await this.clientBusiness.getClientById(id);

      res.status(200).send({ clients });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message || error.sqlMessage);
    }
  };

  updateClient = async (req: Request, res: Response): Promise<void> => {
    try {
      const { clientId, username, email, phone, address, cpf } = req.body;

      const newClientUpdated: Client = {
        id: clientId,
        username,
        email,
        phone,
        address,
        cpf,
      };

      const clientUpdated = await this.clientBusiness.updateClient(
        newClientUpdated
      );

      res
        .status(201)
        .send({ message: "Client updated successfully!", clientUpdated });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message || error.sqlMessage);
    }
  };

  deleteClient = async (req: Request, res: Response): Promise<void> => {
    try {
      const { clientId } = req.body;

      await this.clientBusiness.deleteClient(clientId);

      res.status(200).send({ message: "Client deleted successfully!" });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message || error.sqlMessage);
    }
  };
}

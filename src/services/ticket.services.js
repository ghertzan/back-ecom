import { ticketDao } from "../daos/mongo/ticket.dao.js";

class TicketServices {
	constructor(dao) {
		this.dao = dao;
	}

	create = async (ticketObj) => {
		try {
			return await this.dao.create(ticketObj);
		} catch (error) {
			throw new Error(error);
		}
	};

	getAll = async () => {
		try {
			return await this.dao.getAll();
		} catch (error) {
			throw new Error(error);
		}
	};

	getById = async (id) => {
		try {
			return await this.dao.getById(id);
		} catch (error) {
			throw new Error(error);
		}
	};
}

export const ticketServices = new TicketServices(ticketDao);

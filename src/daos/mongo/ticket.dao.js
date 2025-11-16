import { ticketModel } from "./models/ticket.model.js";

class TicketDao {
	constructor(model) {
		this.model = model;
	}

	create = async (ticketObj) => {
		try {
			const newTicket = await this.model.create(ticketObj);
			return newTicket;
		} catch (error) {
			throw new Error(error);
		}
	};

	getAll = async () => {
		try {
			return await this.model.find({});
		} catch (error) {
			throw new Error(error);
		}
	};

	getById = async (id) => {
		try {
			const ticketFound = await this.model.findById(id);
			return ticketFound;
		} catch (error) {
			throw new Error(error);
		}
	};
}

export const ticketDao = new TicketDao(ticketModel);

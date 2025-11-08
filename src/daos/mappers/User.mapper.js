import UserDTO from "../DTOs/User.dto.js";
import { userServices } from "../../services/user.services.js";
export default class UserMapper {
	constructor() {}

	//Metodo que crea un UserDTO a partir de una entidad
	//del modelo User
	static createUserDTO(entity) {
		const newUserDTO = new UserDTO(entity);
		return JSON.parse(JSON.stringify(newUserDTO));
	}

	static createEntity(userDTO) {
		const newEntity = {
			first_name: userDTO.first_name,
			last_name: userDTO.last_name,
			email: userDTO.email,
			age: userDTO.age,
			cart: userDTO.cart ? null : userDTO.cart,
			role: userDTO.role,
			id: userDTO._id,
		};
		return newEntity;
	}
}

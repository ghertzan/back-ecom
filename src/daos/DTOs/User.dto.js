class UserDTO {
	constructor(entity) {
		this.first_name = entity.first_name;
		this.last_name = entity.last_name;
		this.email = entity.email;
		this.age = entity.age;
		this.cart = entity.cart;
		this.role = entity.role;
		this._id = entity._id;
	}
}

export default UserDTO;

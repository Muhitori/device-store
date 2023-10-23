import { UserModel, users } from "@/lib/models/user.model";

export class UserService {
	static async getAll() {
		return await users.find({});
	}

	static async getById(id: string) {
		return await users.findById(id);
	}

	static async getBy(user: Partial<UserModel>) {
		return await users.find({ ...user });
	}

	static async getOneBy(user: Partial<UserModel>) {
		return await users.findOne({ ...user });
	}

	static async create(user: Partial<UserModel>) {
		return await users.create({ ...user });
	}

	static async update(id: string, user: Partial<UserModel>) {
		return await users.updateOne({ id }, { ...user });
	}

	static async delete(id: string) {
		return await users.deleteOne({ id });
	}
}

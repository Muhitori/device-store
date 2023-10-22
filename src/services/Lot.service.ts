import { LotModel, lots } from "@/lib/models/lot.model";

export class LotService {
	static async getAll() {
		return await lots.find({});
	}

	static async getBy(user: Partial<LotModel>) {
		return await lots.find({ ...user });
	}

	static async getOneBy(user: Partial<LotModel>) {
		return await lots.findOne({ ...user });
	}

	static async create(user: Partial<LotModel>) {
		return await lots.create({ ...user });
	}

	static async update(id: string, user: Partial<LotModel>) {
		return await lots.updateOne({ id }, { ...user });
	}

	static async delete(id: string) {
		return await lots.deleteOne({ id });
	}
}
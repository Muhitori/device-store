import { LotModel, lots } from "@/lib/models/lot.model";

export class LotService {
	static async getAll() {
		return await lots.find({});
	}

	static async getById(id: string) {
		return await lots.findById(id);
	}

	static async getBy(lot: Partial<LotModel>) {
		return await lots.find({ ...lot });
	}

	static async getOneBy(lot: Partial<LotModel>) {
		return await lots.findOne({ ...lot });
	}

	static async create(lot: Partial<LotModel>) {
		return await lots.create({ ...lot });
	}

	static async update(_id: string, lot: Partial<LotModel>) {
		return await lots.updateOne({ _id }, { ...lot });
	}

	static async delete(_id: string) {
		return await lots.deleteOne({ _id });
	}

	static async deleteMany(lot: Partial<LotModel>) {
		return await lots.deleteOne({ ...lot });
	}
}

import { OfferModel, offers } from "@/lib/models/offer.model";

export class OfferService {
	static async getAll() {
		return await offers.find({});
	}

	static async getBy(user: Partial<OfferModel>) {
		return await offers.find({ ...user });
	}

	static async getOneBy(user: Partial<OfferModel>) {
		return await offers.findOne({ ...user });
	}

	static async create(user: Partial<OfferModel>) {
		return await offers.create({ ...user });
	}

	static async update(id: string, user: Partial<OfferModel>) {
		return await offers.updateOne({ id }, { ...user });
	}

	static async delete(id: string) {
		return await offers.deleteOne({ id });
	}
}
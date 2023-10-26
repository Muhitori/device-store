import { OfferModel, offers } from "@/lib/models/offer.model";

export class OfferService {
	static async getAll() {
		return await offers.find({});
	}

	static async getById(id: string) {
		return await offers.findById(id);
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

	static async update(_id: string, user: Partial<OfferModel>) {
		return await offers.updateOne({ _id }, { ...user });
	}

	static async delete(_id: string) {
		return await offers.findByIdAndDelete(_id);
	}

	static async deleteMany(offer: Partial<OfferModel>) {
		return await offers.deleteMany({ ...offer });
	}
}

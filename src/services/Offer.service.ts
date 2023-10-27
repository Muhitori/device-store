import { OfferModel, offers } from "@/lib/models/offer.model";

export class OfferService {
	static async getAll() {
		return await offers.find({});
	}

	static async getById(id: string) {
		return await offers.findById(id);
	}

	static async getBy(offer: Partial<OfferModel>) {
		return await offers.find({ ...offer });
	}

	static async getOneBy(offer: Partial<OfferModel>) {
		return await offers.findOne({ ...offer });
	}

	static async create(offer: Partial<OfferModel>) {
		return await offers.create({ ...offer });
	}

	static async update(_id: string, offer: Partial<OfferModel>) {
		return await offers.updateOne({ _id }, { ...offer });
	}

	static async delete(_id: string) {
		return await offers.findByIdAndDelete(_id);
	}

	static async deleteMany(offer: Partial<OfferModel>) {
		return await offers.deleteMany({ ...offer });
	}
}

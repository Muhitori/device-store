import mongoose from "mongoose";

export interface OfferModel {
	sellerId: string;
	customerId: string;
	orderedDeviceId: string;
	price: string;
	createdAt: string;
}

const offerSchema = new mongoose.Schema(
	{
		sellerId: String,
		customerId: String,
		orderedDeviceId: String,
		price: String,
		office: String,
	},
	{ timestamps: { createdAt: "created" } }
);

export const offers =
	mongoose.models.offers || mongoose.model("offers", offerSchema);

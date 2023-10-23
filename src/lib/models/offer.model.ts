import mongoose from "mongoose";

export interface OfferModel {
	sellerId: string;
	customerId: string;
	customer: string;
	orderedDeviceId: string;
	price: number;
	createdAt: string;
}

const offerSchema = new mongoose.Schema(
	{
		sellerId: String,
		customerId: String,
		customer: String,
		orderedDeviceId: String,
		price: Number,
	},
	{ timestamps: { createdAt: "created" } }
);

export const offers =
	mongoose.models.offers || mongoose.model("offers", offerSchema);

import mongoose from "mongoose";

export interface LotModel {
	customerId: string;
	customer: string;
	sellerId: string;
	orderedDeviceId: string;
	createdAt: string;
}

const lotSchema = new mongoose.Schema(
	{
		customerId: String,
		customer: String,
		sellerId: String,
		orderedDeviceId: String,
	},
	{ timestamps: { createdAt: "created" } }
);

export const lots = mongoose.models.lots || mongoose.model("lots", lotSchema);

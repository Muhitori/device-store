import mongoose from "mongoose";

export interface LotModel {
	customerId: string;
	orderedDeviceId: string;
	createdAt: string;
}

const lotSchema = new mongoose.Schema(
	{
		customerId: String,
		orderedDeviceId: String,
		office: String,
	},
	{ timestamps: { createdAt: "created" } }
);

export const lots = mongoose.models.lots || mongoose.model("lots", lotSchema);

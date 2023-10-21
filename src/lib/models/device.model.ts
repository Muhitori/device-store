import mongoose from "mongoose";

export interface DeviceModel {
	name: string;
	sellerId: string;
	type: string;
	memory: string;
	color: string;
	createdAt: string;
}

const deviceSchema = new mongoose.Schema(
	{
		name: String,
		sellerId: String,
		type: String,
		memory: String,
		color: String,
	},
	{ timestamps: { createdAt: "created" } }
);

export const devices =
	mongoose.models.devices || mongoose.model("devices", deviceSchema);

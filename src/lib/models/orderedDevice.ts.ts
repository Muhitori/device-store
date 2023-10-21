import mongoose from "mongoose";

export interface OrderedDeviceModel {
	name: string;
	type: string;
	memory: string;
	color: string;
	createdAt: string;
}

const orderedDeviceSchema = new mongoose.Schema(
	{
		name: String,
		type: String,
		memory: String,
		color: String,
	},
	{ timestamps: { createdAt: "created" } }
);

export const orderedDevices =
	mongoose.models.orderedDevices ||
	mongoose.model("ordered_devices", orderedDeviceSchema);

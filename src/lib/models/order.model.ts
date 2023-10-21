import mongoose from "mongoose";

export interface OrderModel {
	sellerId: string;
	customerId: string;
	orderedDeviceId: string;
	price: string;
	status: string;
	createdAt: string;
}

const orderSchema = new mongoose.Schema(
	{
		sellerId: String,
		customerId: String,
		orderedDeviceId: String,
		price: String,
		status: String,
	},
	{ timestamps: { createdAt: "created" } }
);

export const orders =
	mongoose.models.orders || mongoose.model("orders", orderSchema);

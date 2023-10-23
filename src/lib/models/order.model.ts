import mongoose from "mongoose";

export type Status = "initial" | "delivery" | "success" | "fail";

export interface OrderModel {
	sellerId: string;
	customerId: string;
	customer: string;
	seller: string;
	orderedDeviceId: string;
	price: number;
	status: Status;
	createdAt: string;
}

const orderSchema = new mongoose.Schema(
	{
		sellerId: String,
		customerId: String,
		customer: String,
		orderedDeviceId: String,
		price: Number,
		status: String,
	},
	{ timestamps: { createdAt: "created" } }
);

export const orders =
	mongoose.models.orders || mongoose.model("orders", orderSchema);

import { IStatus } from "@/types/order";
import mongoose from "mongoose";

export interface OrderModel {
	sellerId: string;
	customerId: string;
	customer: string;
	seller: string;
	orderedDeviceId: string;
	price: number;
	status: IStatus;
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

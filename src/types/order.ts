import { Status } from "@/lib/models/order.model";

export interface IOrder {
	_id: string;
	sellerId: string;
	customerId: string;
	customer: string;
	seller: string;
	orderedDeviceId: string;
	price: number;
	status: Status;
	device: {
		name: string;
		type: Status;
		memory: string;
		color: string;
	};
}

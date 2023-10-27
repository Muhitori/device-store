import { IDeviceType } from "./devices";

export type IStatus = "initial" | "delivery" | "success" | "fail";

export interface IOrder {
	_id: string;
	sellerId: string;
	customerId: string;
	customer: string;
	seller: string;
	orderedDeviceId: string;
	price: number;
	status: IStatus;
	device: {
		name: string;
		type: IDeviceType;
		memory: string;
		color: string;
	};
}

import { CHARACTERISTICS } from "@/constants";

export type IDeviceType = "iphone";
export type DeviceKey = keyof typeof CHARACTERISTICS;

export interface DevicePreview {
	name: string;
	src: string;
}

export interface IOrderedDevice {
	name: string;
	memory: string;
	type: IDeviceType;
	color: string;
}

export interface Device extends IOrderedDevice {
	price: number;
}


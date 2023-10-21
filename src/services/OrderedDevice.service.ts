import {
	OrderedDeviceModel,
	orderedDevices,
} from "@/lib/models/orderedDevice.ts";

export class OrderedDeviceService {
	static async getAll() {
		return await orderedDevices.find({});
	}

	static async getBy(user: Partial<OrderedDeviceModel>) {
		return await orderedDevices.find({ ...user });
	}

	static async getOneBy(user: Partial<OrderedDeviceModel>) {
		return await orderedDevices.findOne({ ...user });
	}

	static async create(user: Partial<OrderedDeviceModel>) {
		return await orderedDevices.create({ ...user });
	}

	static async update(id: string, user: Partial<OrderedDeviceModel>) {
		return await orderedDevices.updateOne({ id }, { ...user });
	}

	static async delete(id: string) {
		return await orderedDevices.deleteOne({ id });
	}
}

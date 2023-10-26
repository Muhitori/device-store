import {
	OrderedDeviceModel,
	orderedDevices,
} from "@/lib/models/orderedDevice.ts";

export class OrderedDeviceService {
	static async getAll() {
		return await orderedDevices.find({});
	}

	static async getById(id: string) {
		return await orderedDevices.findById(id);
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

	static async update(_id: string, user: Partial<OrderedDeviceModel>) {
		return await orderedDevices.updateOne({ _id }, { ...user });
	}

	static async delete(_id: string) {
		return await orderedDevices.deleteOne({ _id });
	}
}

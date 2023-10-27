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

	static async getBy(device: Partial<OrderedDeviceModel>) {
		return await orderedDevices.find({ ...device });
	}

	static async getOneBy(device: Partial<OrderedDeviceModel>) {
		return await orderedDevices.findOne({ ...device });
	}

	static async create(device: Partial<OrderedDeviceModel>) {
		return await orderedDevices.create({ ...device });
	}

	static async update(_id: string, device: Partial<OrderedDeviceModel>) {
		return await orderedDevices.updateOne({ _id }, { ...device });
	}

	static async delete(_id: string) {
		return await orderedDevices.deleteOne({ _id });
	}
}

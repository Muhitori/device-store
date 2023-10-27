import { devices, DeviceModel } from "@/lib/models/device.model";

export class DeviceService {
	static async getAll() {
		return await devices.find({});
	}

	static async getById(id: string) {
		return await devices.findById(id);
	}

	static async getBy(device: Partial<DeviceModel>) {
		return await devices.find({ ...device });
	}

	static async getOneBy(device: Partial<DeviceModel>) {
		return await devices.findOne({ ...device });
	}

	static async create(device: Partial<DeviceModel>) {
		return await devices.create({ ...device });
	}

	static async update(_id: string, device: Partial<DeviceModel>) {
		return await devices.updateOne({ _id }, { ...device });
	}

	static async delete(_id: string) {
		return await devices.deleteOne({ _id });
	}
}

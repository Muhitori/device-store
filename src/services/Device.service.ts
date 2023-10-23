import { devices, DeviceModel } from "@/lib/models/device.model";

export class DeviceService {
	static async getAll() {
		return await devices.find({});
	}

	static async getById(id: string) {
		return await devices.findById(id);
	}

	static async getBy(user: Partial<DeviceModel>) {
		return await devices.find({ ...user });
	}

	static async getOneBy(user: Partial<DeviceModel>) {
		return await devices.findOne({ ...user });
	}

	static async create(user: Partial<DeviceModel>) {
		return await devices.create({ ...user });
	}

	static async update(id: string, user: Partial<DeviceModel>) {
		return await devices.updateOne({ id }, { ...user });
	}

	static async delete(id: string) {
		return await devices.deleteOne({ id });
	}
}

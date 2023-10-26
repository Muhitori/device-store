import { OrderModel, orders } from "@/lib/models/order.model";

export class OrderService {
	static async getAll() {
		return await orders.find({});
	}

	static async getById(id: string) {
		return await orders.findById(id);
	}

	static async getBy(user: Partial<OrderModel>) {
		return await orders.find({ ...user });
	}

	static async getOneBy(user: Partial<OrderModel>) {
		return await orders.findOne({ ...user });
	}

	static async create(user: Partial<OrderModel>) {
		return await orders.create({ ...user });
	}

	static async update(_id: string, user: Partial<OrderModel>) {
		return await orders.updateOne({ _id }, { ...user });
	}

	static async delete(_id: string) {
		return await orders.deleteOne({ _id });
	}
}

import { OrderModel, orders } from "@/lib/models/order.model";

export class OrderService {
	static async getAll() {
		return await orders.find({});
	}

	static async getById(id: string) {
		return await orders.findById(id);
	}

	static async getBy(order: Partial<OrderModel>) {
		return await orders.find({ ...order });
	}

	static async getOneBy(order: Partial<OrderModel>) {
		return await orders.findOne({ ...order });
	}

	static async create(order: Partial<OrderModel>) {
		return await orders.create({ ...order });
	}

	static async update(_id: string, order: Partial<OrderModel>) {
		return await orders.updateOne({ _id }, { ...order });
	}

	static async delete(_id: string) {
		return await orders.deleteOne({ _id });
	}
}

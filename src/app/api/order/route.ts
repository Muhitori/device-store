import dbConnect from "@/lib/dbConnect";
import { LotService } from "@/services/Lot.service";
import { OfferService } from "@/services/Offer.service";
import { OrderService } from "@/services/Order.service";
import { OrderedDeviceService } from "@/services/OrderedDevice.service";
import { UserService } from "@/services/User.service";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	await dbConnect();

	const orders = await OrderService.getAll();
	const data = await Promise.all(
		orders.map(async ({ _doc: order }) => {
			const { _doc: deviceDoc } = await OrderedDeviceService.getById(
				order.orderedDeviceId
			);
			const { _doc: userDoc } = await UserService.getById(order.sellerId);

			const { username: seller } = userDoc;

			return { seller, device: deviceDoc, ...order };
		})
	);

	return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
	const { orderedDeviceId, price, sellerId, customerId, customer } =
		await request.json();
	const status = "initial";

	await dbConnect();

	await LotService.deleteMany({ orderedDeviceId });
	await OfferService.deleteMany({ orderedDeviceId });
	await OrderService.create({
		sellerId,
		customerId,
		customer,
		orderedDeviceId,
		price,
		status,
	});

	return NextResponse.json({});
}

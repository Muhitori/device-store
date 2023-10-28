import dbConnect from "@/lib/dbConnect";
import { LotService } from "@/services/Lot.service";
import { OrderedDeviceService } from "@/services/OrderedDevice.service";
import { UserService } from "@/services/User.service";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const sellerId = searchParams.get("sellerId");

	if (!sellerId) {
		return NextResponse.error();
	}

	await dbConnect();

	const lots = await LotService.getBy({ sellerId });

	const data = await Promise.all(
		lots.map(async ({ _doc: lot }) => {
			const { _doc: device } = await OrderedDeviceService.getById(
				lot.orderedDeviceId
			);

			return { ...device, ...lot };
		})
	);

	return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
	const { customerId, customer, ...device } = await request.json();

	await dbConnect();
	const orderedDevice = await OrderedDeviceService.create({ ...device });
	const sellers = await UserService.getBy({ role: "seller" });

	sellers.forEach(async (seller) => {
		await LotService.create({
			customerId,
			customer,
			sellerId: seller._id,
			orderedDeviceId: orderedDevice._id,
		});
	});

	return NextResponse.json({ id: orderedDevice._id });
}

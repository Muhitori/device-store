import dbConnect from "@/lib/dbConnect";
import { LotService } from "@/services/Lot.service";
import { OrderedDeviceService } from "@/services/OrderedDevice.service";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	const { customerId, ...device } = await request.json();

	await dbConnect();
	const orderedDevice = await OrderedDeviceService.create({ ...device });
	await LotService.create({ customerId, orderedDeviceId: orderedDevice._id });

	return NextResponse.json({});
}

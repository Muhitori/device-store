import dbConnect from "@/lib/dbConnect";
import { LotService } from "@/services/Lot.service";
import { OfferService } from "@/services/Offer.service";
import { OrderedDeviceService } from "@/services/OrderedDevice.service";
import { TelegramService } from "@/services/Telegram.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const customerId = searchParams.get("customerId");

	if (!customerId || customerId === "undefined") {
		return NextResponse.error();
	}

	await dbConnect();
	const offers = await OfferService.getBy({ customerId });

	const data = await Promise.all(
		offers.map(async ({ _doc: offer }) => {
			const { _doc: device } = await OrderedDeviceService.getById(
				offer.orderedDeviceId
			);

			return { ...device, ...offer };
		})
	);

	return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
	console.log(await request.json());
	const { _id, sellerId, customerId, customer, orderedDeviceId, price } =
		await request.json();

	await dbConnect();
	await OfferService.create({
		sellerId,
		customerId,
		customer,
		orderedDeviceId,
		price,
	});
	await LotService.delete(_id);

	const { _doc: device } = await OrderedDeviceService.getById(orderedDeviceId);

	await TelegramService.sendMessage(
		customerId,
		`У вас появилось предложение на ${device.name}.`,
		[
			{
				text: "Предложения",
				web_app: {
					url: `${process.env.BASE_URL}/offers`,
				},
			},
		]
	);

	return NextResponse.json({});
}

export async function DELETE(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	if (!id) {
		return NextResponse.error();
	}

	await dbConnect();

	await OfferService.delete(id);

	return NextResponse.json({});
}

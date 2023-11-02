import dbConnect from "@/lib/dbConnect";
import { OrderedDeviceModel } from "@/lib/models/orderedDevice.ts";
import { UserModel } from "@/lib/models/user.model";
import { DeviceService } from "@/services/Device.service";
import { LotService } from "@/services/Lot.service";
import { OfferService } from "@/services/Offer.service";
import { OrderedDeviceService } from "@/services/OrderedDevice.service";
import { TelegramService } from "@/services/Telegram.service";
import { UserService } from "@/services/User.service";
import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

type UserModelWithId = UserModel & { _id: string };
type OrderedDeviceModelWithId = OrderedDeviceModel & { _id: string };

const createLot = async (
	customerId: string,
	customer: string,
	seller: UserModelWithId,
	orderedDevice: OrderedDeviceModelWithId,
	device: Partial<OrderedDeviceModel>
) => {
	const { name, color, memory, type } = device;
	const sellerDeviceDoc = await DeviceService.getOneBy({
		sellerId: seller._id,
		name,
		color,
		memory,
	});

	if (sellerDeviceDoc) {
		await OfferService.create({
			sellerId: seller._id,
			customerId,
			customer,
			orderedDeviceId: orderedDevice._id,
			price: sellerDeviceDoc._doc.price,
		});

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

		return;
	}

	await LotService.create({
		customerId,
		customer,
		sellerId: seller._id,
		orderedDeviceId: orderedDevice._id,
	});

	if (seller.telegramId) {
		await TelegramService.sendMessage(
			seller.telegramId,
			`У вас появился новый лот на ${device.name}.`,
			[
				{
					text: "Приложение",
					web_app: {
						url: `${process.env.BASE_URL}/seller/lots`,
					},
				},
				{
					text: "Сайт",
					web_app: {
						url: `${process.env.BASE_URL}/seller/lots`,
					},
				},
			]
		);
	}
};

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
	try {
		const { customerId, customer, ...device } = await request.json();

		await dbConnect();
		const orderedDevice = await OrderedDeviceService.create({ ...device });
		const sellers = await UserService.getBy({ role: "seller" });

		await TelegramService.sendMessage(
			customerId,
			`Вы создали запрос на ${device.name}. Когда появятся предложения, мы вас оповестим.`
		);

		sellers.forEach(async (seller) => {
			await createLot(customerId, customer, seller, orderedDevice, device);
		});

		return NextResponse.json({ id: orderedDevice._id });
	} catch (err) {
		return NextResponse.error();
	}
}

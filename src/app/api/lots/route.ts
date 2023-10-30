import dbConnect from "@/lib/dbConnect";
import { LotService } from "@/services/Lot.service";
import { OrderedDeviceService } from "@/services/OrderedDevice.service";
import { TelegramService } from "@/services/Telegram.service";
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
	});

	await TelegramService.sendMessage(
		customerId,
		`Вы создали запрос на ${device.name}. Когда появятся предложения, мы вас оповестим.`
	);

	return NextResponse.json({ id: orderedDevice._id });
}

import { TelegramButton } from "@/types/telegram";
import axios from "axios";

const TELEGRAM_URL = "https://api.telegram.org";

export class TelegramService {
	static async sendMessage(
		userId: string | number,
		text: string,
		buttons?: TelegramButton[]
	) {
		const markup = buttons?.length
			? {
					reply_markup: {
						inline_keyboard: [buttons],
					},
			  }
			: {};

		await axios.post(
			`${TELEGRAM_URL}/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
			{
				chat_id: userId,
				text: text,
				...markup,
			}
		);
	}
}

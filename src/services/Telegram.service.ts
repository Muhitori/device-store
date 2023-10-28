import axios from "axios";

export class TelegramService {
	static async sendMessage(
		userId: string | number,
		text: string,
		buttonText: string,
		url: string
	) {
		await axios.post(
			`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
			{
				chat_id: userId,
				text: text,
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: buttonText,
								web_app: {
									url: url,
								},
							},
						],
					],
				},
			}
		);
	}
}

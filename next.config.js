/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		BASE_URL: process.env.BASE_URL,
		TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
	},
};

module.exports = nextConfig;


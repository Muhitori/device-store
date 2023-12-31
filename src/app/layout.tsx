import "./globals.css";
import { MuiThemeProvider } from "@/providers/MuiTheme.provider";
import type { Metadata } from "next";
import { NotistackProvider } from "@/providers/Notistack.provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { AuthSessionProvider } from "@/providers/AuthSession.provider";
import { TelegramProvider } from "@/providers/Telegram.provider";

interface Props {
	children: React.ReactNode;
}

export const metadata: Metadata = {
	title: "Yushinov store",
	description: "Device store",
};

const RootLayout: React.FC<Props> = async ({ children }) => {
	const session = await getServerSession(authOptions);

	return (
		<html lang='en'>
			<body>
				<TelegramProvider>
					<MuiThemeProvider options={{ key: "mui" }}>
						<NotistackProvider>
							<AuthSessionProvider session={session}>
								{children}
							</AuthSessionProvider>
						</NotistackProvider>
					</MuiThemeProvider>
				</TelegramProvider>
			</body>
		</html>
	);
};

export default RootLayout;


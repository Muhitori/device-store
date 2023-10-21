import "./globals.css";
import { MuiThemeProvider } from "@/providers/muiTheme.provider";
import { ReduxProvider } from "@/providers/redux.provider";
import type { Metadata } from "next";
import { NotistackProvider } from "@/providers/notistack.provider";

interface Props {
	children: React.ReactNode;
}

export const metadata: Metadata = {
	title: "Yushinov store",
	description: "Device store",
};

const RootLayout: React.FC<Props> = ({ children }) => {
	return (
		<html lang='en'>
			<body>
				<ReduxProvider>
					<MuiThemeProvider options={{ key: "mui" }}>
						<NotistackProvider>{children}</NotistackProvider>
					</MuiThemeProvider>
				</ReduxProvider>
			</body>
		</html>
	);
};

export default RootLayout;


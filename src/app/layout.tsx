import { MAX_SNACK } from "@/constants";
import "./globals.css";
import { MuiThemeProvider } from "@/providers/muiThemeProvider";
import { ReduxProvider } from "@/providers/reduxProvider";
import type { Metadata } from "next";
import { SnackbarProvider } from "notistack";
import { SnackbarGenerator } from "../ui/SnackbarGenerator";
import { NotistackProvider } from "@/providers/notistackProvider";

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


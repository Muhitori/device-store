import "./globals.css";
import { MuiThemeProvider } from "@/mui/muiThemeProvider";
import { ReduxProvider } from "@/store/reduxProvider";
import type { Metadata } from "next";

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
						{children}
					</MuiThemeProvider>
				</ReduxProvider>
			</body>
		</html>
	);
};

export default RootLayout;

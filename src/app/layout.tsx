import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/store/providers";

interface Props {
	children: React.ReactNode;
}

export const metadata: Metadata = {
	title: "Yushinov store",
	description: "device store",
};

const RootLayout: React.FC<Props> = ({ children }) => {
	return (
		<html lang='en'>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
};

export default RootLayout;

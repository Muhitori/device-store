"use client";

import { FC, ReactNode, useMemo } from "react";
import { Options } from "@emotion/cache";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { getThemePalette } from "../ui/palette";
import { useTelegram } from "./Telegram.provider";

interface Props {
	children: ReactNode;
	options: Options;
}

export const MuiThemeProvider: FC<Props> = ({ children }) => {
	const { webApp } = useTelegram();

	const theme = useMemo(() => {
		if (!webApp?.themeParams) {
			return createTheme(getThemePalette());
		}

		//telegram returns empty theme object when telegram api used
		if (webApp?.themeParams && Object.keys(webApp.themeParams).length === 0) {
			return createTheme(getThemePalette());
		}

		return createTheme(getThemePalette({ ...webApp.themeParams }));
	}, [webApp]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

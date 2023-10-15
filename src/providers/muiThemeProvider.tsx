"use client";

import { FC, ReactNode, useMemo } from "react";
import { Options } from "@emotion/cache";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { themeSelector } from "@/store/selectors/ui.selector";
import { useSelector } from "react-redux";
import { getThemePalette } from "../ui/palette";

interface Props {
	children: ReactNode;
	options: Options;
}

export const MuiThemeProvider: FC<Props> = ({ children }) => {
	const mode = useSelector(themeSelector);

	const theme = useMemo(() => createTheme(getThemePalette(mode)), [mode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};


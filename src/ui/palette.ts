import { PaletteMode, PaletteOptions, ThemeOptions } from "@mui/material";
import { grey, orange } from "@mui/material/colors";

const getMainPalette = (mode: PaletteMode): PaletteOptions => {
	if (mode === "light") {
		return {
			primary: orange,
			secondary: grey,
			divider: grey[200],
			text: {
				primary: grey[900],
				secondary: grey[800],
			},
		};
	}

	return {
		primary: grey,
		secondary: grey,
		divider: grey[700],
		background: {
			default: grey[900],
			paper: grey[900],
		},
		text: {
			primary: "#fff",
			secondary: grey[500],
		},
	};
};

export const getThemePalette = (mode: PaletteMode): ThemeOptions => ({
	palette: {
		mode,
		...getMainPalette(mode),
	},
	components: {
		MuiButton: {
			styleOverrides: {
				contained: {
					color: mode === "light" ? grey[100] : grey[900],
				},
			},
		},
	},
});

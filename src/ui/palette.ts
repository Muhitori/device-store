import { TelegramThemeParams } from "@/types/telegram";
import { PaletteOptions, ThemeOptions } from "@mui/material";
import { grey, orange } from "@mui/material/colors";

const getTextColor = (background: string) =>
	background < grey[500] ? grey[500] : grey[800];

const getMainPalette = (params?: TelegramThemeParams): PaletteOptions => {
	if (params) {
		return {
			background: {
				default: params.bg_color,
			},
			primary: {
				main: params.button_color,
			},
			secondary: { main: getTextColor(params.bg_color) },
			divider: params.secondary_bg_color,
			text: {
				primary: params.link_color,
				secondary: getTextColor(params.bg_color),
			},
		};
	}

	return {
		primary: orange,
		secondary: orange,
		divider: grey[200],
		text: {
			primary: grey[900],
			secondary: grey[800],
		},
	};
};

export const getThemePalette = (params?: TelegramThemeParams): ThemeOptions => {
	return {
		palette: {
			...getMainPalette(params),
		},
		components: {
			MuiButton: {
				styleOverrides: {
					contained: {
						color: params?.button_text_color || grey[100],
					},
				},
			},
			MuiPaper: {
				styleOverrides: {
					outlined: {
						backgroundColor: params?.bg_color || grey[50],
						borderColor: params?.secondary_bg_color || grey[200],
					},
				},
			},
			MuiDialog: {
				styleOverrides: {
					paper: {
						backgroundColor: params?.bg_color || grey[50],
					},
				},
			},
		},
	};
};


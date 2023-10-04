import { PaletteMode } from "@mui/material";
import { grey } from "@mui/material/colors";

export const getThemePalette = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === "light"
			? {
					primary: grey,
					divider: grey[200],
					text: {
						primary: grey[900],
						secondary: grey[800],
					},
			  }
			: {
					primary: grey,
					divider: grey[700],
					background: {
						default: grey[900],
						paper: grey[900],
					},
					text: {
						primary: "#fff",
						secondary: grey[500],
					},
			  }),
	},
});

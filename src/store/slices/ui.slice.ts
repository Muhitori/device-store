import { createSlice } from "@reduxjs/toolkit";

interface State {
	theme: "dark" | "light";
}

const initialState: State = {
	theme: "light",
};

export const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		toggleTheme: (state) => {
			if (state.theme === "light") {
				state.theme = "dark";
			} else {
				state.theme = "light";
			}
		},
	},
});

export const { toggleTheme } = uiSlice.actions;

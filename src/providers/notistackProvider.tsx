"use client";

import { MAX_SNACK } from "@/constants";
import { SnackbarGenerator } from "@/ui/SnackbarGenerator";
import { SnackbarProvider } from "notistack";
import { FC } from "react";

interface Props {
	children: React.ReactNode;
}

export const NotistackProvider: FC<Props> = ({ children }) => {
	return (
		<SnackbarProvider maxSnack={MAX_SNACK}>
			<SnackbarGenerator />
			{children}
		</SnackbarProvider>
	);
};

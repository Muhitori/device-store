"use client";

import { FC } from "react";
import { store } from "../store/store";
import { Provider } from "react-redux";

interface Props {
	children: React.ReactNode;
}

export const ReduxProvider: FC<Props> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};


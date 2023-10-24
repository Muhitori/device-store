"use client";

import { SessionProvider } from "next-auth/react";
import { FC } from "react";

interface Props {
	children: React.ReactNode;
	session: any;
}

export const AuthSessionProvider: FC<Props> = ({ children, session }) => {
	return <SessionProvider session={session}>{children}</SessionProvider>;
};

"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { snackbarGenerator } from "@/ui/SnackbarGenerator";

export default function isManager(Component: any) {
	return function IsAuth(props: any) {
		const session = useSession();

		useEffect(() => {
			if (!session.data || session.data.user.role !== "manager") {
				snackbarGenerator.error("У вас нет доступа к этой странице.");
				return redirect("/signin");
			}
		});

		return <Component {...props} />;
	};
}

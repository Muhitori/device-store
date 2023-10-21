"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Navigate() {
	const { data: session } = useSession();

	if (session?.user.role === "manager") {
		redirect("/manager");
	}

	if (session?.user.role === "seller") {
		redirect("/seller");
	}
}

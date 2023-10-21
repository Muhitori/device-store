import dbConnect from "@/lib/dbConnect";
import { UserService } from "@/services/User.service";
import { NextResponse } from "next/server";

export async function GET() {
	await dbConnect();
	const appUsers = await UserService.getAll();

	return NextResponse.json({ data: appUsers });
}

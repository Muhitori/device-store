import dbConnect from "@/lib/dbConnect";
import { users } from "@/lib/models/user.model";
import { NextResponse } from "next/server";

export async function GET() {
	await dbConnect();
	const appUsers = await users.find({});

	return NextResponse.json({ data: appUsers });
}

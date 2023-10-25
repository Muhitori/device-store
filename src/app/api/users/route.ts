import dbConnect from "@/lib/dbConnect";
import { UserService } from "@/services/User.service";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
	await dbConnect();
	const appUsers = await UserService.getAll();

	return NextResponse.json({ data: appUsers });
}

export async function POST(request: NextRequest) {
	const user = await request.json();

	await UserService.create(user);

	return NextResponse.json({});
}

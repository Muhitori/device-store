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

export async function PATCH(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");
	const userParams = await request.json();

	if (userParams._id) delete userParams._id;
	if (userParams.createdAt) delete userParams.createdAt;
	if (userParams.updatedAt) delete userParams.updatedAt;

	if (!id) {
		return NextResponse.error();
	}

	await UserService.update(id, userParams);

	return NextResponse.json({});
}

export async function DELETE(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	if (!id) {
		return NextResponse.error();
	}

	await UserService.delete(id);

	return NextResponse.json({});
}

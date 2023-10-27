import dbConnect from "@/lib/dbConnect";
import { DeviceService } from "@/services/Device.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const sellerId = searchParams.get("sellerId");

	if (!sellerId) {
		return NextResponse.error();
	}

	await dbConnect();

	const deviceDocs = await DeviceService.getBy({ sellerId });

	const data = deviceDocs.map(({ _doc }) => _doc);

	return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
	const device = await request.json();
	await dbConnect();

	await DeviceService.create(device);

	return NextResponse.json({});
}

export async function PATCH(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");
	const deviceParams = await request.json();

	if (deviceParams._id) delete deviceParams._id;
	if (deviceParams.createdAt) delete deviceParams.createdAt;
	if (deviceParams.updatedAt) delete deviceParams.updatedAt;

	if (!id) {
		return NextResponse.error();
	}

	await DeviceService.update(id, deviceParams);

	return NextResponse.json({});
}

export async function DELETE(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	if (!id) {
		return NextResponse.error();
	}

	await DeviceService.delete(id);

	return NextResponse.json({});
}

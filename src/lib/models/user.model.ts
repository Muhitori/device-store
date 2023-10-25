import { IRole } from "@/types/users";
import mongoose from "mongoose";

export interface UserModel {
	username: string;
	password: string;
	telegramId: string;
	role: IRole;
	phone: string;
	office: string;
	createdAt: string;
}

const userSchema = new mongoose.Schema(
	{
		username: String,
		password: String,
		telegramId: String,
		role: String,
		phone: String,
		office: String,
	},
	{ timestamps: { createdAt: "created" } }
);

export const users =
	mongoose.models.users || mongoose.model("users", userSchema);

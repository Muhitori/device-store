import mongoose from "mongoose";

export type IRole = "manager" | "seller";

export interface UserModel {
	username: string;
	password: string;
	role: IRole;
	phone: string;
	office: string;
	createdAt: string;
}

const userSchema = new mongoose.Schema(
	{
		username: String,
		password: String,
		role: String,
		phone: String,
		office: String,
	},
	{ timestamps: { createdAt: "created" } }
);

export const users =
	mongoose.models.users || mongoose.model("users", userSchema);

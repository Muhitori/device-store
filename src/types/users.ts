export type IRole = "manager" | "seller";

export interface AuthUser {
	username: string;
	password: string;
}

export interface IUser {
	username: string;
	password: string;
	telegramId: string;
	role: IRole;
	phone: string;
	office: string;
}

export enum UsersTypes {
	Customer = "customer",
	Seller = "seller",
	Manager = "manager",
}

export interface AuthUser {
	username: string;
	password: string;
}

import "next-auth";

declare module "next-auth" {
	interface User {
		_id: number;
		username: string;
		role: string;
		accessToken: string;
		refreshToken: string;
		accessTokenExpires: number;
	}

	interface Session extends DefaultSession {
		user: User;
		expires: string;
		error: string;
	}
}

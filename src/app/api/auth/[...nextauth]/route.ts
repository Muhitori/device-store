import dbConnect from "@/lib/dbConnect";
import { UserService } from "@/services/User.service";
import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			credentials: {
				username: { label: "username" },
				password: { label: "password" },
			},
			async authorize(credentials) {
				if (credentials) {
					const { username, password } = credentials;

					await dbConnect();
					const res = await UserService.getOneBy({
						username,
						password,
					});

					return res ? res : null;
				} else {
					return null;
				}
			},
		}),
	],
	pages: {
		signIn: "/signin",
	},
	session: { strategy: "jwt" },
	jwt: { secret: process.env.NEXTAUTH_SECRET },
	callbacks: {
		async jwt({ token, user, session }) {
			if (user) {
				token.accessToken = user.accessToken;
				token.refreshToken = user.refreshToken;
				token.accessTokenExpires = user.accessTokenExpires;
				token.role = user.role;
				token.id = user.id;
				token.username = user.username;
			}

			return token;
		},
		async session({ session, token, user }) {
			return {
				...session,
				user: {
					...session.user,
					accessToken: token.accessToken as string,
					refreshToken: token.refreshToken as string,
					role: token.role,
					id: token.id,
					username: token.username,
				},
				error: token.error,
			};
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

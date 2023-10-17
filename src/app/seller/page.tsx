import { redirect } from "next/navigation";
export default async function ManagerHome() {
	redirect("/seller/lots");
}

import { redirect } from "next/navigation";
export default async function ManagerHome() {
	redirect("/manager/sellers");
}

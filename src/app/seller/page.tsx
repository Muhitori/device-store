import { redirect } from "next/navigation";
export default async function SellerHome() {
	redirect("/seller/lots");
}

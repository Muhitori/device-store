"use client";
import { Box, Tabs, Tab } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

interface Props {
	children: React.ReactNode;
}

export default function ManagerLayout({ children }: Props) {
	const pathname = usePathname();
	const router = useRouter();

	const tab = pathname.split("/").pop();

	const handleTabChange = (event: React.SyntheticEvent, newTab: string) => {
		router.push(newTab);
	};

	return (
		<Box width='100%' height='100%'>
			<Tabs variant='fullWidth' value={tab} onChange={handleTabChange}>
				<Tab label='Пользователи' value='users' />
				<Tab label='Заказы' value='orders' />
				{/* <Tab label='Партнёрка' value='partners' />
				<Tab label='Статистика' value='statistics' /> */}
			</Tabs>

			{children}
		</Box>
	);
}

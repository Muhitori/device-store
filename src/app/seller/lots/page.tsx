"use client";
import { DeviceLot } from "@/components/DeviceLot";
import isSeller from "@/components/HOC/isSeller";
import { ILot } from "@/types/lot";
import { Box } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

function Lots() {
	const session = useSession();
	const [lots, setLots] = useState<ILot[]>([]);

	const sellerId = useMemo(
		() => session.data?.user.id,
		[session.data?.user.id]
	);

	useEffect(() => {
		const effect = async () => {
			const {
				data: { data: lots },
			} = await axios.get(`/api/lot?sellerId=${sellerId}`);

			setLots(lots);
		};

		effect();
	}, [sellerId]);

	return (
		<Box display='flex' justifyContent='center'>
			<Box maxWidth='700px' display='flex' flexDirection='column' p={2} gap={2}>
				{lots.map((lot) => (
					<DeviceLot key={lot._id} lot={lot} />
				))}
			</Box>
		</Box>
	);
}

export default isSeller(Lots);

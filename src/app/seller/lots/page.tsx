"use client";
import { DeviceLot } from "@/components/DeviceLot";
import isSeller from "@/components/HOC/isSeller";
import { Loading } from "@/components/Loading";
import { lotsFetcher } from "@/services/fetchers";
import { ILot } from "@/types/lot";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import useSWR from "swr";

function Lots() {
	const session = useSession();

	const sellerId = useMemo(
		() => session.data?.user.id,
		[session.data?.user.id]
	);

	const {
		data: lots,
		error,
		isLoading,
	} = useSWR("lots", lotsFetcher(sellerId));

	return (
		<Box display='flex' justifyContent='center'>
			<Box maxWidth='700px' display='flex' flexDirection='column' p={2} gap={2}>
				{isLoading && <Loading />}
				{lots && lots.map((lot: ILot) => <DeviceLot key={lot._id} lot={lot} />)}
			</Box>
		</Box>
	);
}

export default isSeller(Lots);

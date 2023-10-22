"use client";
import { DeviceLot } from "@/components/DeviceLot";
import isSeller from "@/components/HOC/isSeller";
import { devicesForUser } from "@/constants";
import { Box } from "@mui/material";

function Lots() {
	return (
		<Box display='flex' justifyContent='center'>
			<Box maxWidth='700px' display='flex' flexDirection='column' p={2} gap={2}>
				{devicesForUser.map((device, index) => (
					<DeviceLot key={index} device={device} />
				))}
			</Box>
		</Box>
	);
}

export default isSeller(Lots);

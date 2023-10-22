"use client";
import { DeviceOffer } from "@/components/DeviceOffer";
import { InfoDialog } from "@/components/InfoDialog";
import { devicesForUser } from "@/constants";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useState, useMemo } from "react";

export default function CreateOrderPage() {
	const params = useParams();

	const [open, setOpen] = useState(false);

	const deviceName = useMemo(
		() => (params.deviceName as string).replace(/%20/g, " "),
		[params]
	);

	console.log(params);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<Box display='flex' justifyContent='center'>
			<Box maxWidth='700px' display='flex' flexDirection='column' p={2} gap={2}>
				<Typography variant='h5' color='secondary' textAlign='center' pb={2}>
					Поставщики предлагают такие цены по вашему запросу {deviceName}
				</Typography>
				{devicesForUser.map((device, index) => (
					<DeviceOffer key={index} device={device} onClick={handleOpen} />
				))}
				<InfoDialog
					open={open}
					onClose={handleClose}
					title='Заказ создан!'
					content={`Вы создали заказ на ${deviceName}. В скором времени с вами свяжется менеджер для уточнения данных.`}
				/>
			</Box>
		</Box>
	);
}

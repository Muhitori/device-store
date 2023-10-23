"use client";
import { DeviceOffer } from "@/components/DeviceOffer";
import { InfoDialog } from "@/components/InfoDialog";
import { useTelegram } from "@/providers/Telegram.provider";
import { IOffer } from "@/types/offer";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

export default function CreateOrderPage() {
	const { user } = useTelegram();
	const [offers, setOffers] = useState<IOffer[]>([]);

	const [open, setOpen] = useState(false);

	useEffect(() => {
		const effect = async () => {
			if (!user) return;

			const {
				data: { data: offers },
			} = await axios.get(`/api/offer?customerId=${user?.id}`);

			setOffers(offers);
		};

		effect();
	}, [user]);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<Box display='flex' justifyContent='center'>
			<Box maxWidth='700px' display='flex' flexDirection='column' p={2} gap={2}>
				<Typography variant='h5' color='secondary' textAlign='center' pb={2}>
					Поставщики предлагают такие цены по вашим запросам
				</Typography>
				{offers.map((offer) => (
					<DeviceOffer
						key={offer._id}
						offer={offer}
						onOrderClick={handleOpen}
					/>
				))}
				<InfoDialog
					open={open}
					onClose={handleClose}
					title='Заказ создан!'
					content={`Вы создали заказ. В скором времени с вами свяжется менеджер для уточнения данных.`}
				/>
			</Box>
		</Box>
	);
}

"use client";
import { DeviceOffer } from "@/components/DeviceOffer";
import { InfoDialog } from "@/components/InfoDialog";
import { Loading } from "@/components/Loading";
import { useTelegram } from "@/providers/Telegram.provider";
import { offersFetcher } from "@/services/fetchers";
import { IOffer } from "@/types/offer";
import { Box, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";

export default function CreateOrderPage() {
	const { user } = useTelegram();

	const [open, setOpen] = useState(false);

	const {
		data: offers,
		error,
		isLoading,
	} = useSWR("offers", offersFetcher(user?.id));

	useEffect(() => {
		mutate("offers");
	}, [user?.id]);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<Box display='flex' justifyContent='center'>
			<Box maxWidth='700px' display='flex' flexDirection='column' p={2} gap={2}>
				<Typography variant='h5' color='secondary' textAlign='center' pb={2}>
					Поставщики предлагают такие цены по вашим запросам
				</Typography>
				{isLoading && <Loading />}
				{offers &&
					offers.map((offer: IOffer) => (
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

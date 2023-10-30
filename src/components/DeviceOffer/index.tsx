import { IOffer } from "@/types/offer";
import { snackbarGenerator } from "@/ui/SnackbarGenerator";
import { Box, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import { FC } from "react";
import { useSWRConfig } from "swr";

interface Props {
	offer: IOffer;
	onOrderClick: () => void;
}

export const DeviceOffer: FC<Props> = ({ offer, onOrderClick }) => {
	const { mutate } = useSWRConfig();
	const { name, color, memory, price } = offer;

	const createOrderHandler = async () => {
		try {
			await axios.post("/api/orders", offer);

			mutate("offers");
			onOrderClick();
		} catch (err) {
			snackbarGenerator.error("Возникла ошибка.");
		}
	};

	const cancelOrderHandler = async () => {
		try {
			await axios.delete(`/api/offers?id=${offer._id}`);

			mutate("offers");
			snackbarGenerator.success("Предложение удалено.");
		} catch (err) {
			snackbarGenerator.error("Возникла ошибка.");
		}
	};

	return (
		<Paper
			variant='outlined'
			sx={{ display: "flex", flexDirection: "column", p: 2 }}>
			<Article label='Устройство' value={name} />
			<Article label='Цвет' value={color} />
			<Article label='Память' value={memory} />
			<Article label='Цена' value={price.toString()} />
			<Button variant='outlined' onClick={createOrderHandler}>
				Заказать
			</Button>
			<Button color='secondary' variant='outlined' onClick={cancelOrderHandler}>
				Отменить
			</Button>
		</Paper>
	);
};

const Article: FC<{ label: string; value: string }> = ({ label, value }) => {
	return (
		<Box display='flex' justifyContent='space-between'>
			<Typography display='inline' variant='body1' mr={2}>
				{label}:
			</Typography>
			<Typography display='inline' variant='body2'>
				{value}
			</Typography>
		</Box>
	);
};


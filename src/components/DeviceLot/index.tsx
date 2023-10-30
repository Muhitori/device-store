import { ILot } from "@/types/lot";
import { snackbarGenerator } from "@/ui/SnackbarGenerator";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { FC, useState } from "react";
import { useSWRConfig } from "swr";

interface Props {
	lot: ILot;
}

export const DeviceLot: FC<Props> = ({ lot }) => {
	const { mutate } = useSWRConfig();
	const { name, color, memory } = lot;
	const [value, setValue] = useState<string>("");

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
		setValue(event.target.value);

	const clickHandler = async () => {
		try {
			await axios.post("/api/offers", { ...lot, price: parseFloat(value) });

			mutate("lots");
			snackbarGenerator.success(`Цена ${value} на ${name} выставлена!`);
		} catch (err) {
			snackbarGenerator.error("Возникла ошибка");
		}
	};

	return (
		<Paper
			variant='outlined'
			sx={{ display: "flex", flexDirection: "column", p: 2 }}>
			<Article label='Устройство' value={name} />
			<Article label='Цвет' value={color} />
			<Article label='Память' value={memory} />
			<Box display='flex'>
				<TextField
					placeholder='Введите цену'
					size='small'
					value={value}
					onChange={changeHandler}
				/>
				<Button
					size='small'
					variant='outlined'
					onClick={clickHandler}
					sx={{ fontSize: { xs: "8px", sm: "8px", md: "13px", lg: "13px" } }}>
					Дать цену
				</Button>
			</Box>
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

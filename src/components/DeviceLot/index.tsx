import { Device } from "@/types/devices";
import { snackbarGenerator } from "@/ui/SnackbarGenerator";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";

interface Props {
	device: Device;
}

export const DeviceLot: FC<Props> = ({
	device: { name, color, memory, price },
}) => {
	const [value, setValue] = useState("");

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
		setValue(event.target.value);

	const clickHandler = () => {
		snackbarGenerator.success(`Цена ${value} на ${name} выставлена!`);
	};

	return (
		<Paper
			elevation={1}
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

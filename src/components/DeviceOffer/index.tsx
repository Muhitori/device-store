import { Device } from "@/types/devices";
import { Box, Button, Paper, Typography } from "@mui/material";
import { FC, useState } from "react";

interface Props {
	device: Device;
	onClick: () => void;
}

export const DeviceOffer: FC<Props> = ({
	device: { color, memory, price },
	onClick,
}) => {
	return (
		<Paper
			elevation={1}
			sx={{ display: "flex", flexDirection: "column", p: 2 }}>
			<Article label='Цвет' value={color} />
			<Article label='Память' value={memory} />
			<Article label='Цена' value={price.toString()} />
			<Button variant='outlined' onClick={onClick}>
				Заказать
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

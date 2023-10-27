import { Box, Tooltip, Typography } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { FC } from "react";

export const InfoColumn: FC<GridRenderCellParams> = ({ id, value, row }) => {
	const { color, memory, price } = row.device;

	return (
		<Tooltip
			arrow
			disableInteractive
			title={
				<Box display='flex' flexDirection='column' gap={1}>
					<Article label='Цвет' value={color} />
					<Article label='Память' value={memory} />
				</Box>
			}>
			<Box>{value}</Box>
		</Tooltip>
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

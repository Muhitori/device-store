import { Box, IconButton } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { FC } from "react";
import axios from "axios";
import { useSWRConfig } from "swr";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const ActionColumn: FC<GridRenderCellParams> = ({ id }) => {
	const { mutate } = useSWRConfig();

	const deleteUser = async () => {
		await axios.delete(`/api/users?id=${id}`);
		mutate("users");
	};

	return (
		<Box
			width='100%'
			height='100%'
			display='flex'
			justifyContent='center'
			alignItems='center'>
			<IconButton color='secondary' onClick={deleteUser}>
				<DeleteOutlineIcon />
			</IconButton>
		</Box>
	);
};

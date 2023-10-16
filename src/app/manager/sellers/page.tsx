"use client";
import { sellers } from "@/constants/mockups";
import { snackbarGenerator } from "@/ui/SnackbarGenerator";
import { Box, Button, Container } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
	{ field: "username", headerName: "Telegram", flex: 1 },
	{ field: "password", headerName: "Password", flex: 1 },
	{ field: "phone", headerName: "Phone", flex: 1 },
	{ field: "office", headerName: "Office", flex: 1 },
];

export default function Sellers() {
	const addSellerHandler = () => {
		snackbarGenerator.success("Продавец добавлен!");
	};

	return (
		<Container sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
			<Box>
				<Button variant='contained' onClick={addSellerHandler}>
					Добавить
				</Button>
			</Box>
			<DataGrid autoHeight rows={sellers} columns={columns} />
		</Container>
	);
}

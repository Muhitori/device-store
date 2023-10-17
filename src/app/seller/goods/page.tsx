"use client";

import { devicesForUser } from "@/constants";
import { snackbarGenerator } from "@/ui/SnackbarGenerator";
import { Box, Button, Container } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";

const columns: GridColDef[] = [
	{ field: "name", headerName: "Name", flex: 1 },
	{ field: "memory", headerName: "Memory", flex: 1 },
	{ field: "color", headerName: "Color", flex: 1 },
	{ field: "price", headerName: "Price", flex: 1 },
];

export default function Goods() {
	const addGoodsHandler = () => {
		snackbarGenerator.success("Продавец добавлен!");
	};

	return (
		<Container sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
			<Box>
				<Button variant='contained' onClick={addGoodsHandler}>
					Добавить
				</Button>
			</Box>
			<DataGrid autoHeight rows={devicesForUser} columns={columns} />
		</Container>
	);
}

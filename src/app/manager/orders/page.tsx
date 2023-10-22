"use client";
import isManager from "@/components/HOC/isManager";
import { orders } from "@/constants";
import { Container } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";

const columns: GridColDef[] = [
	{ field: "id", headerName: "#", flex: 0.5 },
	{ field: "customer", headerName: "Customer", flex: 1 },
	{ field: "seller", headerName: "Seller", flex: 1 },
	{ field: "status", headerName: "Status", flex: 1 },
	{ field: "device", headerName: "Device", flex: 1 },
	{ field: "price", headerName: "Price", flex: 1 },
];

function Orders() {
	return (
		<Container sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
			<DataGrid autoHeight rows={orders} columns={columns} />
		</Container>
	);
}

export default isManager(Orders);

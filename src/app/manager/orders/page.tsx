"use client";
import isManager from "@/components/HOC/isManager";
import { OrderModel } from "@/lib/models/order.model";
import { Container } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useState, useEffect } from "react";

const columns: GridColDef[] = [
	{ field: "customer", headerName: "Customer", flex: 1 },
	{ field: "seller", headerName: "Seller", flex: 1 },
	{ field: "status", headerName: "Status", flex: 1 },
	{
		field: "device.name",
		headerName: "Device",
		flex: 1,
		valueGetter: (params) => params.row?.device?.name,
	},
	{ field: "price", headerName: "Price", flex: 1 },
];

function Orders() {
	const [orders, setOrders] = useState<OrderModel[]>([]);

	useEffect(() => {
		const effect = async () => {
			const {
				data: { data: orders },
			} = await axios.get("/api/order");

			setOrders(orders);
		};

		effect();
	}, []);

	return (
		<Container sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
			<DataGrid
				autoHeight
				rows={orders}
				columns={columns}
				getRowId={(row) => row._id}
			/>
		</Container>
	);
}

export default isManager(Orders);

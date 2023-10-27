"use client";
import isManager from "@/components/HOC/isManager";
import { Loading } from "@/components/Loading";
import { ordersFetcher } from "@/services/fetchers";
import { Container } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import useSWR from "swr";
import { SelectColumn, InfoColumn } from "./columns";

const columns: GridColDef[] = [
	{ field: "customer", headerName: "Customer", flex: 1 },
	{ field: "seller", headerName: "Seller", flex: 1 },
	{
		field: "status",
		headerName: "Status",
		flex: 1,
		renderCell: (params) => <SelectColumn {...params} />,
	},
	{
		field: "device.name",
		headerName: "Device",
		flex: 1,
		valueGetter: (params) => params.row?.device?.name,
		renderCell: (params) => <InfoColumn {...params} />,
	},
	{ field: "price", headerName: "Price", flex: 1 },
];

function Orders() {
	const { data: orders, error, isLoading } = useSWR("orders", ordersFetcher);

	return (
		<Container sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
			<DataGrid
				autoHeight
				loading={isLoading}
				rows={orders || []}
				columns={columns}
				getRowId={(row) => row._id}
				slots={{ loadingOverlay: Loading }}
			/>
		</Container>
	);
}

export default isManager(Orders);

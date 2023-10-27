"use client";

import isSeller from "@/components/HOC/isSeller";
import { Box, Button, Container } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { ActionColumn, InputColumn, SelectColumn } from "./columns";
import { Loading } from "@/components/Loading";
import { devicesFetcher } from "@/services/fetchers";
import { useState, useMemo } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { CreateDeviceDialog } from "./CreateDeviceDialog";

const columns: GridColDef[] = [
	{
		field: "name",
		headerName: "Name",
		flex: 1,
		renderCell: (params) => <InputColumn {...params} />,
	},
	{
		field: "memory",
		headerName: "Memory",
		flex: 1,
		renderCell: (params) => <SelectColumn {...params} />,
	},
	{
		field: "color",
		headerName: "Color",
		flex: 1,
		renderCell: (params) => <SelectColumn {...params} />,
	},
	{
		field: "price",
		headerName: "Price",
		flex: 1,
		renderCell: (params) => <InputColumn {...params} />,
	},
	{
		field: "actions",
		type: "actions",
		width: 20,
		renderCell: (params) => <ActionColumn {...params} />,
	},
];

function Devices() {
	const session = useSession();

	const sellerId = useMemo(
		() => session.data?.user.id,
		[session.data?.user.id]
	);

	const [open, setOpen] = useState(false);
	const {
		data: devices,
		error,
		isLoading,
	} = useSWR("devices", devicesFetcher(sellerId));

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Container sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
			<Box>
				<Button variant='contained' onClick={handleOpen}>
					Добавить
				</Button>
			</Box>
			<DataGrid
				autoHeight
				loading={isLoading}
				rows={Array.isArray(devices) ? devices : []}
				columns={columns}
				getRowId={(row) => row._id}
				slots={{ loadingOverlay: Loading }}
			/>
			<CreateDeviceDialog open={open} handleClose={handleClose} />
		</Container>
	);
}

export default isSeller(Devices);

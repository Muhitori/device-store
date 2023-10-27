"use client";

import isManager from "@/components/HOC/isManager";
import { Loading } from "@/components/Loading";
import { usersFetcher } from "@/services/fetchers/users";
import { Box, Button, Container } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import useSWR from "swr";
import {
	ActionColumn,
	InputColumn,
	SelectColumn,
} from "@/app/manager/users/columns";
import { CreateUserDialog } from "./CreateUserDialog";

const columns: GridColDef[] = [
	{
		field: "username",
		headerName: "Telegram",
		flex: 1,
		renderCell: (params) => <InputColumn {...params} />,
	},
	{
		field: "password",
		headerName: "Password",
		flex: 1,
		renderCell: (params) => <InputColumn {...params} />,
	},
	{
		field: "role",
		headerName: "Role",
		flex: 1,
		renderCell: (params) => <SelectColumn {...params} />,
	},
	{
		field: "phone",
		headerName: "Phone",
		flex: 1,
		renderCell: (params) => <InputColumn {...params} />,
	},
	{
		field: "office",
		headerName: "Office",
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

function Users() {
	const [open, setOpen] = useState(false);
	const { data: users, error, isLoading } = useSWR("users", usersFetcher);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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
				rows={Array.isArray(users) ? users : []}
				columns={columns}
				getRowId={(row) => row._id}
				slots={{ loadingOverlay: Loading }}
			/>
			<CreateUserDialog open={open} handleClose={handleClose} />
		</Container>
	);
}

export default isManager(Users);

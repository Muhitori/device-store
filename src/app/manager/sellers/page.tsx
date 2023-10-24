"use client";
import isManager from "@/components/HOC/isManager";
import { Loading } from "@/components/Loading";
import { usersFetcher } from "@/services/fetchers/users";
import { snackbarGenerator } from "@/ui/SnackbarGenerator";
import { Box, Button, Container } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useSWR from "swr";

const columns: GridColDef[] = [
	{ field: "username", headerName: "Telegram", flex: 1 },
	{ field: "password", headerName: "Password", flex: 1 },
	{ field: "role", headerName: "Role", flex: 1 },
	{ field: "phone", headerName: "Phone", flex: 1 },
	{ field: "office", headerName: "Office", flex: 1 },
];

function Sellers() {
	const {
		data: users,
		error,
		isLoading,
		mutate,
	} = useSWR("users", usersFetcher);

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
			<DataGrid
				autoHeight
				loading={isLoading}
				rows={users || []}
				columns={columns}
				getRowId={(row) => row._id}
				slots={{ loadingOverlay: Loading }}
			/>
		</Container>
	);
}

export default isManager(Sellers);

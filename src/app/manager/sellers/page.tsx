"use client";
import isManager from "@/components/HOC/isManager";
import { UserModel } from "@/lib/models/user.model";
import { snackbarGenerator } from "@/ui/SnackbarGenerator";
import { Box, Button, Container } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useState, useEffect } from "react";

const columns: GridColDef[] = [
	{ field: "username", headerName: "Telegram", flex: 1 },
	{ field: "password", headerName: "Password", flex: 1 },
	{ field: "role", headerName: "Role", flex: 1 },
	{ field: "phone", headerName: "Phone", flex: 1 },
	{ field: "office", headerName: "Office", flex: 1 },
];

function Sellers() {
	const [users, setUsers] = useState<UserModel[]>([]);

	useEffect(() => {
		const effect = async () => {
			const {
				data: { data: users },
			} = await axios.get("/api/users");

			setUsers(users);
		};

		effect();
	}, []);

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
				rows={users}
				columns={columns}
				getRowId={(row) => row._id}
			/>
		</Container>
	);
}

export default isManager(Sellers);

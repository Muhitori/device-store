"use client";
import * as Yup from "yup";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import isManager from "@/components/HOC/isManager";
import { Loading } from "@/components/Loading";
import { usersFetcher } from "@/services/fetchers/users";
import { IRole, IUser } from "@/types/users";
import { snackbarGenerator } from "@/ui/SnackbarGenerator";
import { Box, Button, Container, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Form, Formik, FormikProps } from "formik";
import { useRef, useState } from "react";
import useSWR from "swr";
import { FormInput } from "@/components/FormInput";
import { FormSelect } from "@/components/FormSelect";
import axios from "axios";

const validationSchema = Yup.object().shape({
	username: Yup.string().required("Обязательное поле!"),
	password: Yup.string().required("Обязательное поле!"),
	telegramId: Yup.string().required("Обязательное поле!"),
	role: Yup.string().required("Обязательное поле!"),
	phone: Yup.string().required("Обязательное поле!"),
	office: Yup.string().required("Обязательное поле!"),
});

const roles: IRole[] = ["seller", "manager"];

const initialValues: IUser = {
	username: "",
	password: "",
	telegramId: "",
	role: roles[0],
	phone: "",
	office: "",
};

const columns: GridColDef[] = [
	{ field: "username", headerName: "Telegram", flex: 1 },
	{ field: "password", headerName: "Password", flex: 1 },
	{ field: "role", headerName: "Role", flex: 1 },
	{ field: "phone", headerName: "Phone", flex: 1 },
	{ field: "office", headerName: "Office", flex: 1 },
];

function Users() {
	const [open, setOpen] = useState(false);
	const formRef = useRef<FormikProps<IUser> | null>(null);
	const {
		data: users,
		error,
		isLoading,
		mutate,
	} = useSWR("users", usersFetcher);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleSubmit = async (data: IUser) => {
		try {
			await axios.post("/api/users", data);
			await mutate("users");

			snackbarGenerator.success("Продавец добавлен!");
			handleClose();
		} catch (err) {
			snackbarGenerator.success("Ошибка!");
		}
	};

	const submitForm = () => {
		if (formRef.current) {
			formRef.current.handleSubmit();
		}
	};

	return (
		<Container sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
			<Box>
				<Button variant='contained' onClick={handleOpen}>
					Добавить
				</Button>
			</Box>
			{isLoading ? (
				<Loading />
			) : (
				<DataGrid
					autoHeight
					loading={isLoading}
					rows={Array.isArray(users) ? users : []}
					columns={columns}
					getRowId={(row) => row._id}
					slots={{ loadingOverlay: Loading }}
				/>
			)}
			<ConfirmDialog
				open={open}
				title='Создание пользователя'
				onConfirm={submitForm}
				onCancel={handleClose}
				maxWidth='sm'>
				<Formik
					innerRef={formRef}
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}>
					<Form>
						<Grid md={7} display='flex' flexDirection='column' gap={2}>
							<FormInput name='username' />
							<FormInput name='password' />
							<FormInput name='telegramId' />
							<FormSelect name='role' options={roles} />
							<FormInput name='phone' />
							<FormInput name='office' />
						</Grid>
					</Form>
				</Formik>
			</ConfirmDialog>
		</Container>
	);
}

export default isManager(Users);
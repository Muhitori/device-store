import { ConfirmDialog } from "@/components/ConfirmDialog";
import { FormInput } from "@/components/FormInput";
import { FormSelect } from "@/components/FormSelect";
import { IRole, IUser } from "@/types/users";
import { snackbarGenerator } from "@/ui/SnackbarGenerator";
import { Grid } from "@mui/material";
import axios from "axios";
import { FormikProps, Formik, Form } from "formik";
import { FC, useRef } from "react";
import { useSWRConfig } from "swr";
import * as Yup from "yup";

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

interface Props {
	open: boolean;
	handleClose: () => void;
}

export const CreateUserDialog: FC<Props> = ({ open, handleClose }) => {
	const { mutate } = useSWRConfig();
	const formRef = useRef<FormikProps<IUser> | null>(null);

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
					<Grid display='flex' flexDirection='column' gap={2}>
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
	);
};

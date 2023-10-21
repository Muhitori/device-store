"use client";
import * as Yup from "yup";
import { Box, Button, Grid, Typography } from "@mui/material";
import { AuthUser } from "@/types/users";
import { FormikProps, Formik, Form } from "formik";
import { useRef } from "react";
import { FormInput } from "@/components/FormInput";
import { FormPasswordInput } from "@/components/FormPasswordInput";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

const validationSchema = Yup.object().shape({
	username: Yup.string().required("Обязательное поле!"),
	password: Yup.string().required("Обязательное поле!"),
});

const initialValues: AuthUser = {
	username: "",
	password: "",
};

export default function SignIn() {
	const formRef = useRef<FormikProps<AuthUser> | null>(null);

	const handleSubmit = (data: AuthUser) => {
		const { username, password } = data;

		signIn("credentials", {
			username,
			password,
			callbackUrl: "/signin/navigate",
		});
	};

	return (
		<Grid height='100%' container justifyContent='center' alignItems='center'>
			<Grid item sm={8} md={3} pt={1}>
				<Formik
					innerRef={formRef}
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}>
					<Form>
						<Box width='100%' display='flex' flexDirection='column' gap={2}>
							<Typography variant='h2' textAlign='center'>
								Вход
							</Typography>
							<FormInput name='username' />
							<FormPasswordInput name='password' />

							<Button variant='contained' type='submit' fullWidth>
								Войти
							</Button>
						</Box>
					</Form>
				</Formik>
			</Grid>
		</Grid>
	);
}

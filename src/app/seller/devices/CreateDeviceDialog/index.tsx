import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Device } from "@/types/devices";
import { snackbarGenerator } from "@/ui/SnackbarGenerator";
import axios from "axios";
import { Formik, FormikProps } from "formik";
import { FC, useMemo, useRef } from "react";
import { useSWRConfig } from "swr";
import * as Yup from "yup";
import { CreateDeviceForm } from "./CreateDeviceForm";
import { types } from "@/constants";
import { useSession } from "next-auth/react";

const validationSchema = Yup.object().shape({
	name: Yup.string().required("Обязательное поле!"),
	memory: Yup.string().required("Обязательное поле!"),
	type: Yup.string().required("Обязательное поле!"),
	color: Yup.string().required("Обязательное поле!"),
});

const initialValues: Device = {
	name: "",
	memory: "",
	type: types[0],
	color: "",
	price: 0,
};

interface Props {
	open: boolean;
	handleClose: () => void;
}

export const CreateDeviceDialog: FC<Props> = ({ open, handleClose }) => {
	const { mutate } = useSWRConfig();
	const formRef = useRef<FormikProps<Device> | null>(null);

	const session = useSession();

	const sellerId = useMemo(
		() => session.data?.user.id,
		[session.data?.user.id]
	);

	const handleSubmit = async (data: Device) => {
		try {
			await axios.post("/api/devices", { ...data, sellerId });
			await mutate("devices");

			snackbarGenerator.success("Устройство добавлено!");
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
			title='Создание устройства'
			onConfirm={submitForm}
			onCancel={handleClose}
			maxWidth='sm'>
			<Formik
				innerRef={formRef}
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}>
				<CreateDeviceForm />
			</Formik>
		</ConfirmDialog>
	);
};

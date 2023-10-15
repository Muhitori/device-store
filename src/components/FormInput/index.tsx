import { Field, FieldProps, useFormikContext } from "formik";
import { TextField } from "@mui/material";

interface Props<T> {
	name: keyof T;
}

export const FormInput = <T,>({ name }: Props<T>) => {
	const { errors, touched } = useFormikContext<T>();

	const hasError = touched[name] && Boolean(errors[name]);

	return (
		<Field name={name}>
			{({ field }: FieldProps) => (
				<TextField
					fullWidth
					error={hasError}
					label={name as string}
					helperText={hasError && `${errors[name] as string}`}
					{...field}
				/>
			)}
		</Field>
	);
};

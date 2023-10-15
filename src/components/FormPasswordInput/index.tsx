import { Field, FieldProps, useFormikContext } from "formik";
import {
	IconButton,
	InputAdornment,
	TextField,
	capitalize,
} from "@mui/material";
import { FC, useCallback, useState } from "react";
import { AuthUser } from "@/types/users";
import { VisibilityOff, Visibility } from "@mui/icons-material";

interface Props {
	name: keyof AuthUser;
}

export const FormPasswordInput: FC<Props> = ({ name }) => {
	const { errors, touched } = useFormikContext<AuthUser>();

	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = useCallback(() => {
		setShowPassword(!showPassword);
	}, [showPassword]);

	const hasError = touched[name] && Boolean(errors[name]);

	return (
		<Field name={name}>
			{({ field }: FieldProps) => (
				<TextField
					fullWidth
					error={hasError}
					label={name}
					helperText={hasError && `${errors[name] as string}`}
					type={showPassword ? "text" : "password"}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton
									aria-label='toggle password visibility'
									onClick={toggleShowPassword}
									edge='end'>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
					{...field}
				/>
			)}
		</Field>
	);
};

import { FC } from "react";
import { Field, FieldProps } from "formik";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select as MuiSelect,
} from "@mui/material";

interface Props {
	name: string;
	options?: string[];
}

export const FormSelect: FC<Props> = ({ name, options }) => {
	return (
		<Field name={name}>
			{({ field }: FieldProps) => (
				<FormControl>
					<InputLabel>{name}</InputLabel>
					<MuiSelect fullWidth label={name} {...field}>
						{options?.map((option, index) => (
							<MenuItem key={`formik-select-${index}`} value={option}>
								{option}
							</MenuItem>
						))}
					</MuiSelect>
				</FormControl>
			)}
		</Field>
	);
};

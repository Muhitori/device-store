import {
	FormControl,
	InputLabel,
	Select as MuiSelect,
	MenuItem,
	SelectChangeEvent,
	SxProps,
} from "@mui/material";
import { FC } from "react";

interface Props {
	value: string | number;
	label: string;
	values: (string | number)[];
	onChange: (value: string) => void;
	sx?: SxProps;
}

export const Select: FC<Props> = ({ value, label, values, onChange, sx }) => {
	const handleChange = (event: SelectChangeEvent<string>) => {
		onChange(event.target.value);
	};

	return (
		<FormControl
			sx={{ width: { xs: "100%", sm: "100%", md: "50%", lg: "30%" }, ...sx }}>
			<InputLabel>{label}</InputLabel>
			<MuiSelect
				value={String(value) || String(values[0])}
				label={label}
				onChange={handleChange}>
				{values.map((value) => (
					<MenuItem key={value} value={value}>
						{value}
					</MenuItem>
				))}
			</MuiSelect>
		</FormControl>
	);
};


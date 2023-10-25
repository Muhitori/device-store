import {
	FormControl,
	InputLabel,
	Select as MuiSelect,
	MenuItem,
	SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";

interface Props {
	value: string;
	label: string;
	values: string[];
	onChange: (value: SelectChangeEvent<string>) => void;
}

export const Select: FC<Props> = ({ value, label, values, onChange }) => {
	return (
		<FormControl
			sx={{ width: { xs: "100%", sm: "100%", md: "50%", lg: "30%" } }}>
			<InputLabel>{label}</InputLabel>
			<MuiSelect value={value || values[0]} label={label} onChange={onChange}>
				{values.map((value) => (
					<MenuItem key={value} value={value}>
						{value}
					</MenuItem>
				))}
			</MuiSelect>
		</FormControl>
	);
};


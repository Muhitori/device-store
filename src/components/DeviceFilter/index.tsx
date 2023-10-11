import {
	FormControl,
	InputLabel,
	Select,
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

export const DeviceFilter: FC<Props> = ({ value, label, values, onChange }) => {
	return (
		<FormControl
			sx={{ width: { xs: "100%", sm: "100%", md: "50%", lg: "30%" } }}>
			<InputLabel>{label}</InputLabel>
			<Select value={value || values[0]} label={label} onChange={onChange}>
				{values.map((value) => (
					<MenuItem key={value} value={value}>
						{value}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

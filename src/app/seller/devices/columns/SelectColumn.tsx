import { Select } from "@/components/Select";
import { CHARACTERISTICS } from "@/constants";
import { DeviceKey } from "@/types/devices";
import { GridRenderCellParams } from "@mui/x-data-grid";
import axios from "axios";
import { FC, useMemo } from "react";
import { useSWRConfig } from "swr";

export const SelectColumn: FC<GridRenderCellParams> = ({
	id,
	value,
	row,
	colDef,
}) => {
	const { mutate } = useSWRConfig();

	const options = useMemo(() => {
		if (colDef.field === "color") {
			return CHARACTERISTICS[row.name as DeviceKey].colors;
		}

		if (colDef.field === "memory") {
			return CHARACTERISTICS[row.name as DeviceKey].storages;
		}

		return [];
	}, [colDef.field, row.name]);

	const onChange = async (value: string) => {
		await axios.patch(`/api/devices?id=${id}`, { [colDef.field]: value });
		mutate("devices");
	};

	return (
		<Select
			sx={{
				minWidth: "100%",
				boxShadow: "none",
				".MuiOutlinedInput-notchedOutline": { border: "none" },
				"&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
					border: "none",
				},
				"&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
					{
						border: "none",
					},
			}}
			value={value}
			label=''
			values={options}
			onChange={onChange}
		/>
	);
};

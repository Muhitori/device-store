import { Select } from "@/components/Select";
import { IRole } from "@/types/users";
import { GridRenderCellParams } from "@mui/x-data-grid";
import axios from "axios";
import { FC } from "react";
import { useSWRConfig } from "swr";

const roles: IRole[] = ["seller", "manager"];

export const SelectColumn: FC<GridRenderCellParams> = ({ id, value, row }) => {
	const { mutate } = useSWRConfig();

	const onChange = async (value: string) => {
		await axios.patch(`/api/users?id=${id}`, { role: value });
		mutate("users");
	};

	return (
		<Select
			sx={{
				minWidth: "100%",
				boxShadow: "none",
				".MuiOutlinedInput-notchedOutline": { border: 0 },
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
			values={roles}
			onChange={onChange}
		/>
	);
};

import { Select } from "@/components/Select";
import { IStatus } from "@/types/order";
import { GridRenderCellParams } from "@mui/x-data-grid";
import axios from "axios";
import { FC } from "react";
import { useSWRConfig } from "swr";

const statuses: IStatus[] = ["initial", "delivery", "success", "fail"];

export const SelectColumn: FC<GridRenderCellParams> = ({ id, value, row }) => {
	const { mutate } = useSWRConfig();

	const onChange = async (value: string) => {
		await axios.patch(`/api/orders?id=${id}`, { status: value });
		mutate("orders");
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
			values={statuses}
			onChange={onChange}
		/>
	);
};

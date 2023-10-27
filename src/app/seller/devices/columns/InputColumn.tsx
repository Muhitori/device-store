import { TextField } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import axios from "axios";
import { FC, useRef, useState } from "react";
import { useSWRConfig } from "swr";

export const InputColumn: FC<GridRenderCellParams> = ({
	id,
	value,
	row,
	colDef,
}) => {
	const inputRef = useRef<HTMLInputElement>();
	const { mutate } = useSWRConfig();
	const [inputValue, setInputValue] = useState(value);

	const onChange = (value: string) => {
		setInputValue(value);
	};

	const handleUpdate = async () => {
		await axios.patch(`/api/devices?id=${id}`, { [colDef.field]: inputValue });
		mutate("devices");
	};

	return (
		<TextField
			inputRef={inputRef}
			sx={{
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
			value={inputValue}
			onChange={(event) => onChange(event.target.value)}
			onBlur={handleUpdate}
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					inputRef.current?.blur();
					handleUpdate();
				}
			}}
		/>
	);
};

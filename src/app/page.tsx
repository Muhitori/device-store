"use client";
import { useAppDispatch } from "@/store/hooks";
import { toggleTheme } from "@/store/slices/ui.slice";
import { Box, Button } from "@mui/material";

export default function Home() {
	const dispatch = useAppDispatch();

	const clickHandler = () => dispatch(toggleTheme());

	return (
		<Box
			width='100%'
			height='100%'
			display='flex'
			justifyContent='center'
			alignItems='center'
			flexDirection='column'>
			<Button onClick={clickHandler} variant='contained'>
				Toggle
			</Button>
		</Box>
	);
}

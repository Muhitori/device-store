"use client";
import { useAppDispatch } from "@/store/hooks";
import { themeSelector } from "@/store/selectors/ui.selector";
import { toggleTheme } from "@/store/slices/ui.slice";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function Home() {
	const dispatch = useAppDispatch();
	const theme = useSelector(themeSelector);

	const clickHandler = () => dispatch(toggleTheme());

	return (
		<main>
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
				<Typography variant='h5'>{theme}</Typography>
			</Box>
		</main>
	);
}

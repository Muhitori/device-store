"use client";
import { DeviceCard } from "@/components/DeviceCard";
import { DEVICES } from "@/constants/devices";
import { useAppDispatch } from "@/store/hooks";
import { toggleTheme } from "@/store/slices/ui.slice";
import { Box, Button, Typography } from "@mui/material";

export default function Home() {
	const dispatch = useAppDispatch();

	const clickHandler = () => dispatch(toggleTheme());

	return (
		<Box width='100%' height='100%' p={2}>
			<Button variant='contained' onClick={clickHandler}>
				Toggle
			</Button>
			<Box
				display='flex'
				flexDirection='column'
				justifyContent='center'
				paddingY={4}>
				<Typography
					variant='h2'
					textAlign='center'
					fontSize='20px'
					lineHeight='26px'
					fontWeight='800'>
					Покупайте по рыночной цене
				</Typography>
				<Typography
					variant='h5'
					color='secondary'
					textAlign='center'
					fontSize='14px'
					lineHeight='25.2px'
					fontWeight='400'>
					Создайте запрос и выберите лучшую цену
				</Typography>
			</Box>
			<Box
				display='flex'
				flexWrap='wrap'
				justifyContent='space-between'
				gap={1}>
				{Object.values(DEVICES.iphone).map(({ name, src }, index) => (
					<DeviceCard key={name} name={name} src={src} timeout={index * 500} />
				))}
			</Box>
		</Box>
	);
}

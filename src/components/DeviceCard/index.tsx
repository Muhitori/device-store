import { Box, Button, Paper, Typography } from "@mui/material";
import Image from "next/image";

export const DeviceCard = () => {
	return (
		<Paper
			elevation={0}
			sx={{
				width: "30%",
				height: { xs: "200px", sm: "320px", md: "350px", lg: "350px" },
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "space-between",
				p: 2,
			}}>
			<Box
				height='100%'
				position='relative'
				sx={{
					width: { xs: "100%", sm: "100%", md: "80%", lg: "50%" },
					height: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
				}}>
				<Image
					fill
					src='/devices/iPhones/11/black.png'
					alt='device image'></Image>
			</Box>
			<Typography
				variant='body1'
				textAlign='center'
				fontWeight={800}
				py={1}
				sx={{ fontSize: { xs: "8px", sm: "12px", md: "12px", lg: "14px" } }}>
				iPhone 15 Pro Max
			</Typography>
			<Button
				variant='contained'
				size='small'
				sx={{
					width: "80%",
					borderRadius: 28,
					fontSize: { xs: "8px", sm: "12px", md: "12px", lg: "14px" },
				}}>
				Выбрать
			</Button>
		</Paper>
	);
};

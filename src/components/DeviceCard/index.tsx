import { DevicePreview } from "@/types/devices";
import { Box, Button, Grow, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

type Props = DevicePreview & { timeout: number };

export const DeviceCard: FC<Props> = ({ name, src, timeout }) => {
	const router = useRouter();

	const onChoose = () => router.push(`/${name}`);

	return (
		<Grow in={true} timeout={timeout} style={{ transformOrigin: "0 0 0" }}>
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
						height: "100%",
					}}>
					<Image fill src={src} alt={`${name} image`} sizes=''></Image>
				</Box>
				<Typography
					variant='body1'
					textAlign='center'
					fontWeight={800}
					py={1}
					sx={{ fontSize: { xs: "8px", sm: "12px", md: "12px", lg: "14px" } }}>
					{name}
				</Typography>
				<Button
					variant='contained'
					size='small'
					sx={{
						width: "80%",
						borderRadius: 28,
						fontSize: { xs: "8px", sm: "12px", md: "12px", lg: "14px" },
					}}
					onClick={onChoose}>
					Выбрать
				</Button>
			</Paper>
		</Grow>
	);
};

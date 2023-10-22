"use client";
import { DeviceFilter } from "@/components/DeviceFilter";
import { devicesForUser } from "@/constants/mockups";
import {
	Box,
	Button,
	Divider,
	SelectChangeEvent,
	Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter, useParams } from "next/navigation";

export default function DevicePage() {
	const router = useRouter();
	const params = useParams();
	const [deviceMemories, setDeviceMemories] = useState<string[]>([]);
	const [deviceColors, setDeviceColors] = useState<string[]>([]);

	const [selectedMemory, setSelectedMemory] = useState("");
	const [selectedColor, setSelectedColor] = useState("");

	const deviceName = useMemo(
		() => (params.deviceName as string).replace(/%20/g, " "),
		[params]
	);

	useEffect(() => {
		setDeviceMemories([
			...new Set(devicesForUser.map((device) => device.memory)),
		]);
		setDeviceColors([...new Set(devicesForUser.map((device) => device.color))]);
	}, []);

	const onMemoryChange = (event: SelectChangeEvent<string>) => {
		setSelectedMemory(event.target.value);
	};

	const onColorChange = (event: SelectChangeEvent<string>) => {
		setSelectedColor(event.target.value);
	};

	return (
		<Box display='flex' flexDirection='column'>
			<Box display='flex' gap={2}>
				<Button color='secondary' onClick={() => router.back()}>
					<ArrowBackIcon />
				</Button>
			</Box>
			<Divider />
			<Box display='flex' justifyContent='center'>
				<Box
					maxWidth='700px'
					display='flex'
					flexDirection='column'
					alignItems='center'
					gap={2}
					p={2}>
					<Typography variant='body2' color='secondary' textAlign='center'>
						{`На это странице вы можете срздать лот для ${deviceName}. Выберите подходящие характеристики для девайса и создайте лот.\n
				В течении 10 минут вы получите оповещение о том, что продавцы выставили цены, за которые они будут готовы продать вам ${deviceName}.\n
				Когда вы определитесь с тем, какой из лотов вам больше подходит, с вами свяжется менеджер, для уточнения информации и обработки вашего заказа.`}
					</Typography>
					{!!deviceMemories.length && (
						<DeviceFilter
							value={selectedMemory}
							label='Память'
							values={deviceMemories}
							onChange={onMemoryChange}
						/>
					)}
					{!!deviceColors.length && (
						<DeviceFilter
							value={selectedColor}
							label='Цвет'
							values={deviceColors}
							onChange={onColorChange}
						/>
					)}
					<Button variant='contained'>Создать лот</Button>
				</Box>
			</Box>
		</Box>
	);
}

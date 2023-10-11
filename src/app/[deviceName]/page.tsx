"use client";
import { DeviceFilter } from "@/components/DeviceFilter";
import { DeviceOffer } from "@/components/DeviceOffer";
import { InfoDialog } from "@/components/InfoDialog";
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

const Step1 = () => {
	const params = useParams();

	const [deviceMemories, setDeviceMemories] = useState<string[]>([]);
	const [deviceColors, setDeviceColors] = useState<string[]>([]);

	const [selectedMemory, setSelectedMemory] = useState("");
	const [selectedColor, setSelectedColor] = useState("");

	const deviceName = useMemo(
		() => (params.deviceName as string).replace(/%20/g, " "),
		[params]
	);

	const onMemoryChange = (event: SelectChangeEvent<string>) => {
		setSelectedMemory(event.target.value);
	};

	const onColorChange = (event: SelectChangeEvent<string>) => {
		setSelectedColor(event.target.value);
	};

	useEffect(() => {
		setDeviceMemories([
			...new Set(devicesForUser.map((device) => device.memory)),
		]);
		setDeviceColors([...new Set(devicesForUser.map((device) => device.color))]);
	}, []);

	return (
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
	);
};

const Step2 = () => {
	const params = useParams();

	const [open, setOpen] = useState(false);

	const deviceName = useMemo(
		() => (params.deviceName as string).replace(/%20/g, " "),
		[params]
	);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<Box maxWidth='700px' display='flex' flexDirection='column' p={2} gap={2}>
			<Typography variant='h5' color='secondary' textAlign='center' pb={2}>
				Поставщики предлагают такие цены по вашему запросу {deviceName}
			</Typography>
			{devicesForUser.map((device, index) => (
				<DeviceOffer key={index} device={device} onClick={handleOpen} />
			))}
			<InfoDialog
				open={open}
				onClose={handleClose}
				title='Заказ создан!'
				content={`Вы создали заказ на ${deviceName}. В скором времени с вами свяжется менеджер для уточнения данных.`}
			/>
		</Box>
	);
};

export default function DevicePage() {
	const router = useRouter();
	const [step, setStep] = useState(1);

	return (
		<Box display='flex' flexDirection='column'>
			<Box display='flex' gap={2}>
				<Button color='secondary' onClick={() => router.back()}>
					<ArrowBackIcon />
				</Button>
				<Button variant='contained' onClick={() => setStep(1)}>
					Step 1
				</Button>
				<Button variant='contained' onClick={() => setStep(2)}>
					Step 2
				</Button>
			</Box>
			<Divider />
			<Box display='flex' justifyContent='center'>
				{step === 1 ? <Step1 /> : <Step2 />}
			</Box>
		</Box>
	);
}

"use client";

import { Select } from "@/components/Select";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter, useParams } from "next/navigation";
import { snackbarGenerator } from "@/ui/SnackbarGenerator";
import axios from "axios";
import { useTelegram } from "@/providers/Telegram.provider";
import { DeviceKey } from "@/types/devices";
import { CHARACTERISTICS } from "@/constants";

export default function DevicePage() {
	const router = useRouter();
	const params = useParams();
	const { user } = useTelegram();

	const deviceName = useMemo(
		() => (params.deviceName as string).replace(/%20/g, " ") as DeviceKey,
		[params]
	);

	const deviceMemories = useMemo(
		() => CHARACTERISTICS[deviceName]?.storages,
		[deviceName]
	);
	const deviceColors = useMemo(
		() => CHARACTERISTICS[deviceName]?.colors,
		[deviceName]
	);

	const [selectedMemory, setSelectedMemory] = useState(deviceMemories[0]);
	const [selectedColor, setSelectedColor] = useState(deviceColors[0]);

	const onMemoryChange = (value: string) => {
		setSelectedMemory(parseInt(value));
	};

	const onColorChange = (value: string) => {
		setSelectedColor(value);
	};

	const handleCreateLot = async () => {
		try {
			if (!user) {
				throw new Error("Проблема с телеграмом.");
			}

			axios.post("/api/lots", {
				customerId: user.id,
				customer: user.username,
				name: deviceName,
				type: "iphone",
				memory: selectedMemory,
				color: selectedColor,
			});

			snackbarGenerator.success(`Лот на ${deviceName} создан.`);
		} catch (err) {
			snackbarGenerator.error("Возникла ошибка.");
		}
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
						<Select
							value={selectedMemory}
							label='Память'
							values={deviceMemories}
							onChange={onMemoryChange}
						/>
					)}
					{!!deviceColors.length && (
						<Select
							value={selectedColor}
							label='Цвет'
							values={deviceColors}
							onChange={onColorChange}
						/>
					)}
					<Button variant='contained' onClick={handleCreateLot}>
						Создать лот
					</Button>
				</Box>
			</Box>
		</Box>
	);
}

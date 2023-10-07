import { Typography } from "@mui/material";
import { FC } from "react";

interface Props {
	params: { deviceName: string };
}

export const DevicePage: FC<Props> = ({ params }) => {
	const deviceName = params.deviceName.replace(/%20/g, " ");

	return (
		<Typography variant='h1' textAlign='center'>
			{deviceName}
		</Typography>
	);
};

export default DevicePage;

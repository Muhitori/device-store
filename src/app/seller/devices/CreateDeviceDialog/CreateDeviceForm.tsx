import { FormInput } from "@/components/FormInput";
import { FormSelect } from "@/components/FormSelect";
import { CHARACTERISTICS, types } from "@/constants";
import { Device, DeviceKey } from "@/types/devices";
import { Grid } from "@mui/material";
import { useFormikContext, Form } from "formik";

export const CreateDeviceForm = () => {
	const { values } = useFormikContext<Device>();

	return (
		<Form>
			<Grid display='flex' flexDirection='column' gap={2}>
				<FormInput name='name' />
				{CHARACTERISTICS[values.name as DeviceKey] && (
					<FormSelect
						name='memory'
						options={CHARACTERISTICS[values.name as DeviceKey].storages || []}
					/>
				)}
				{CHARACTERISTICS[values.name as DeviceKey] && (
					<FormSelect
						name='color'
						options={CHARACTERISTICS[values.name as DeviceKey].colors || []}
					/>
				)}
				<FormSelect name='type' options={types} />
				<FormInput name='price' />
			</Grid>
		</Form>
	);
};

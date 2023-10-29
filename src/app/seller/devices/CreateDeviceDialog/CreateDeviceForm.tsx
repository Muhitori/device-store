import { FormInput } from "@/components/FormInput";
import { FormSelect } from "@/components/FormSelect";
import { CHARACTERISTICS, types } from "@/constants";
import { Device, DeviceKey } from "@/types/devices";
import { Grid } from "@mui/material";
import { useFormikContext, Form } from "formik";

export const CreateDeviceForm = () => {
	const { values } = useFormikContext<Device>();
	const name = values.name as DeviceKey;

	return (
		<Form>
			<Grid display='flex' flexDirection='column' gap={2}>
				<FormInput name='name' />
				{CHARACTERISTICS[name] && (
					<FormSelect
						name='memory'
						options={CHARACTERISTICS[name].storages || []}
					/>
				)}
				{CHARACTERISTICS[name] && (
					<FormSelect
						name='color'
						options={CHARACTERISTICS[name].colors || []}
					/>
				)}
				<FormSelect name='type' options={types} />
				<FormInput name='price' />
			</Grid>
		</Form>
	);
};

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@mui/material";
import { FC } from "react";

interface Props {
	open: boolean;
	onClose: () => void;
	title: string;
	content: string;
}

export const InfoDialog: FC<Props> = ({ open, onClose, title, content }) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{content}</DialogContentText>
			</DialogContent>
			<DialogActions sx={{ display: "flex", justifyContent: "center" }}>
				<Button variant='outlined' autoFocus onClick={onClose}>
					OK
				</Button>
			</DialogActions>
		</Dialog>
	);
};

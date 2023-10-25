import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Breakpoint,
} from "@mui/material";
import { FC, ReactNode } from "react";

interface Props {
	open: boolean;
	title: string;
	children: ReactNode;
	onConfirm: () => void;
	onCancel: () => void;
	maxWidth?: Breakpoint;
}

export const ConfirmDialog: FC<Props> = ({
	open,
	onConfirm,
	title,
	children,
	onCancel,
	maxWidth,
}) => {
	return (
		<Dialog
			fullWidth
			maxWidth={maxWidth || "md"}
			open={open}
			onClose={onCancel}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>{children}</DialogContent>
			<DialogActions sx={{ display: "flex", justifyContent: "center" }}>
				<Button variant='outlined' autoFocus onClick={onConfirm}>
					Подтвердить
				</Button>
				<Button color='secondary' variant='outlined' onClick={onCancel}>
					Отменить
				</Button>
			</DialogActions>
		</Dialog>
	);
};


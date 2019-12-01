import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

export const ConfirmationDialog = ({
  open,
  title,
  variant,
  description,
  onSubmit,
  onClose
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onSubmit}>
          YES, I AGREE
        </Button>
        <Button color="primary" onClick={onClose} autoFocus>
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
};

import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import { useSnackbar } from "notistack";

interface Props {
  onDialogAccept: Function;
  setError: Function;
  activator: Function;
  children: JSX.Element;
}
function SimpleModal({ onDialogAccept, setError, activator, children }: Props) {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const save = async () => {
    try {
      const response = await onDialogAccept();
      setOpen(!response);
      setError(!response);
    } catch (error) {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
        preventDuplicate: true
      });
    }
  };
  const close = () => {
    setError(false);
    setOpen(false);
  };
  return (
    <>
      {activator({ setOpen })}
      <Dialog
        onClose={close}
        open={open}
        maxWidth="md"
        className="modal-general"
      >
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <IconButton onClick={close} color="secondary" aria-label="reject">
            <ClearIcon />
          </IconButton>
          <IconButton onClick={save} color="primary" aria-label="accept">
            <CheckIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default SimpleModal;

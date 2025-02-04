import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const SAUConfirmDialog = ({ open, onClose, onConfirm, title, message }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title || "คำเตือน"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          ยกเลิก
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          ยืนยัน
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SAUConfirmDialog;
import React, { useEffect, useRef } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { selectAlert, showAlert } from "../../redux/slices/alertSlice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AppAlert() {
  const { isVisible, type, description } = useAppSelector(selectAlert);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      closeAlert();
    }, 2000);
    return () => {};
  }, []);

  const closeAlert = () => {
    dispatch(
      showAlert({
        isVisible: false,
        type: "success",
        description: "",
      })
    );
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    closeAlert();
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={isVisible}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {description}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

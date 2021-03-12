import React, {useState} from "react";
import Snackbar from "@material-ui/core/Snackbar";

export default function AlertMassage({ message, onClose }) {
    const [open, setOpen] = useState(true);
    function handleClose(event, reason) {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
        onClose();
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                        horizontal: "left"
                }}
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                message={message}
            />
        </div>
    );
}

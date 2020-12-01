import React from "react"
import {Dialog, DialogContent, DialogTitle, Slide, Typography} from "@material-ui/core"
import AppBars from "./appBar"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />
});

const CustomDialog = ({isOpen, title, handleClose, children}) => {
    return (
        <Dialog open={isOpen} fullScreen TransitionComponent={Transition}>
            <AppBars handleClose={handleClose}/>
            <DialogTitle>
                <Typography align={"center"}>
                    {title}
                </Typography>
            </DialogTitle>

            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default CustomDialog

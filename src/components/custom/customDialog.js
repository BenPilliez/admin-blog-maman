import React from "react"
import {Dialog, DialogContent, DialogTitle, Slide, Typography} from "@material-ui/core"
import PropTypes from 'prop-types'
import AppBars from "./appBar"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
});

const CustomDialog = ({isOpen, title,fullScreen,fullWidth, handleClose, children}) => {
    return (
        <Dialog open={isOpen} fullScreen={fullScreen} fullWidth={fullWidth} TransitionComponent={Transition}>
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

CustomDialog.defaultProps = {
    isOpen: false,
    fullScreen: false,
    fullWidth: true
}

CustomDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    fullWidth: PropTypes.bool,
    fullScreen: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.element
}

export default CustomDialog

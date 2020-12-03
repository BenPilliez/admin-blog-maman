import React from "react"
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Typography} from "@material-ui/core"
import PropTypes from 'prop-types'
import AppBars from "./appBar"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
});

const CustomDialog = ({isOpen, title,fullScreen,fullWidth, handleClose, children, dialogActions}) => {
    return (
        <Dialog open={isOpen} fullScreen={fullScreen} fullWidth={fullWidth} TransitionComponent={Transition}>
            {!dialogActions ? <AppBars handleClose={handleClose}/> : null }
            <DialogTitle>
                <Typography align={"center"}>
                    {title}
                </Typography>
            </DialogTitle>

            <DialogContent>
                {children}
            </DialogContent>

            {dialogActions ? <DialogActions>
                {dialogActions.map((item, index) => {
                    return(
                        <Button key={index} onClick={item.handler ? item.handler : handleClose} color={item.color ? item.color : 'primary'}>
                        {item.label}
                    </Button>
                    )
                })}
            </DialogActions> : null }

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
    children: PropTypes.element,
    dialogActions: PropTypes.array
}

export default CustomDialog

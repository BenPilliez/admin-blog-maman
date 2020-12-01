import React from "react"
import {AppBar, IconButton, Toolbar} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const useStyles = makeStyles((theme) => ({
        appBar: {
            position: 'relative',
        },
}))

const AppBars = ({handleClose}) => {

    const classes = useStyles()

    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <FontAwesomeIcon icon={"times"} />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default AppBars

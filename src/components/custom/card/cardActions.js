import React from "react"
import {Button, CardActions} from "@material-ui/core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    flex:{
        display: 'flex',
        justifyContent: 'center'
    }

}))

const RenderCardActions = (props) => {

    const {actions} = props
    const classes = useStyle()

    return (
        <CardActions className={classes.flex}>
            {actions && actions.map((button, index) => {
                return (<Button onClick={button.handler} size="small" color="primary" key={index} startIcon={button.icon ? <FontAwesomeIcon icon={button.icon} /> : null}>
                    {button.label}
                </Button>)
            })}
        </CardActions>
    )


}

export default RenderCardActions

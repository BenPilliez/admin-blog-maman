import React from "react"
import {Button, CardActions} from "@material-ui/core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {makeStyles} from "@material-ui/core/styles"


const useStyle = makeStyles((theme) => ({
    flex: {
        display: 'flex',
        justifyContent: 'center'
    }

}))

const RenderCardActions = (props) => {

    const {actions, row} = props
    const classes = useStyle()
    const [checked, setChecked] = React.useState(row.published)


    const RenderActions = (props) => {
        const {button} = props

        return <Button onClick={() => button.handler(row.id)} size="small" color="primary"
                       startIcon={button.icon ? <FontAwesomeIcon icon={button.icon}/> : null}>
            {button.label}
        </Button>

    }

    return (
        <CardActions className={classes.flex}>
            {actions && actions.map((button, index) => {
                return (<RenderActions button={button} key={index}/>)
            })}
        </CardActions>
    )


}

export default RenderCardActions

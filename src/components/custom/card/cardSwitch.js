import React from "react"
import {FormControl, FormControlLabel, Switch} from "@material-ui/core";


const RenderCardSwitch = (props) => {
    const {switchButton, row} = props
    const [checked, setChecked] = React.useState(row.published)

    return (
        <FormControl component='fieldset'>
            <FormControlLabel
                labelPlacement={switchButton.labelPlacement}
                control={<Switch
                    checked={checked}
                    onChange={(event) => {
                        setChecked(event.target.checked)
                        row.published = event.target.checked
                        switchButton.handler(row.id, event.target.checked)
                    }}/>}
                label={switchButton.label}/>
        </FormControl>
    )
}

export default RenderCardSwitch

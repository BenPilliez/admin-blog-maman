import React from "react"
import {FormControl, Switch} from "@material-ui/core"
import PropTypes from "prop-types"

const TableSwitch = ({data,id,handler,row}) => {

    const [checked, setChecked] = React.useState(data)

    return (
        <FormControl>
            <Switch
                checked={checked}
                onChange={(event) => {
                    setChecked(event.target.checked)
                    row.published = event.target.checked
                    console.log(row)
                    handler(id, event.target.checked)
                }}
            />
        </FormControl>
    )
}

TableSwitch.propTypes = {
    id: PropTypes.any.isRequired,
    data: PropTypes.bool.isRequired,
    handler: PropTypes.func.isRequired
}

export default TableSwitch

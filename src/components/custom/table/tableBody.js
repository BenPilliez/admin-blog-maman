import React from "react"
import {Button, Checkbox, TableBody, TableCell, TableRow} from "@material-ui/core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const RenderTableBody = (props) => {

    const {loadError, rows, selected, handleSelect, headCell, actions} = props
    const isSelected = (id) => selected.indexOf(id) !== -1;

    const RenderTableError = () => {
        return (
            <TableRow>
                <TableCell>{loadError}</TableCell>
            </TableRow>
        )
    }

    const RenderTableRow = (props) => {
        const {row, option} = props

        const data = option.data && typeof option.data === "function" ? option.data(row) : row[option.label]
        return (
            <TableCell>{data}</TableCell>
        )
    }

    const RenderTableAction = (props) => {
        const {action, id} = props
        return (
            <TableCell>
                <Button color={"primary"}
                        onClick={() => action.handler(id)}
                        startIcon={<FontAwesomeIcon icon={action.icon}/>}>
                    {action.label}
                </Button>
            </TableCell>
        )
    }

    return (
        <TableBody>
            {!loadError && rows ? rows.map((row, index) => {

                const isItemSelected = isSelected(row.id);
                const labelId = `table-checkbox-${index}`

                return (
                    <TableRow
                        key={index}
                        hover
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        selected={isItemSelected}
                    >
                        <TableCell padding="checkbox">
                            <Checkbox
                                checked={isSelected(row.id)}
                                onClick={(event) => handleSelect(event, row.id)}
                                inputProps={{'aria-labelledby': labelId}}
                            />
                        </TableCell>
                        {headCell.map((option, key) => {
                            return <RenderTableRow key={key} row={row} option={option}/>
                        })}

                        {actions && actions.map((action, key) => {
                            return <RenderTableAction key={key} action={action} id={row.id}/>

                        })}

                    </TableRow>
                )
            }) : (<RenderTableError/>)}
        </TableBody>
    )
}

export default RenderTableBody

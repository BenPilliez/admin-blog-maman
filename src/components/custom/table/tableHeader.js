import React from "react"
import {TableCell, TableHead, TableRow, TableSortLabel} from "@material-ui/core";

const RenderTableHead = (props) => {

    const {headCell, handleSort, direction,orderBy} = props

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                </TableCell>
                {headCell.map((item, index) => {
                    return item.sorting ?
                        <TableCell
                            key={index}
                            sortDirection={orderBy === item.label ? direction : false}
                        >
                            <TableSortLabel
                                active={orderBy === item.label || orderBy === item.bddName}
                                direction={orderBy === item.label || orderBy === item.bddName ? direction : 'asc'}
                                onClick={() => handleSort(item.bddName ? item.bddName : item.label)}
                            >
                                {item.label.toUpperCase()}
                            </TableSortLabel>
                        </TableCell>
                        : (<TableCell key={index}> {item.label.toUpperCase()} </TableCell>)
                })}
            </TableRow>
        </TableHead>
    )
}

export default RenderTableHead

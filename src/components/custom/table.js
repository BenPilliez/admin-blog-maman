import React from "react"
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core"

const ReuseTable = (props) => {
    const {options, rows} = props

    const RenderTableHead = () => {
        return (
            <TableHead>
                <TableRow>
                    {options.map((item, index) => {
                        return <TableCell key={index}> {item.label.toUpperCase()} </TableCell>
                    })}
                </TableRow>
            </TableHead>
        )
    }

    const RenderTableBody = () => {
        return (
            <TableBody>
                {rows && rows.map((row, index) => {
                    return (
                        <TableRow key={index}>
                            {options.map((option,key) => {
                                return (
                                    <RenderTableRow key={key} row={row} option={option}/>
                                )
                            })}
                        </TableRow>
                    )
                })}
            </TableBody>
        )
    }
    const RenderTableRow = (props) => {
        const {row, option} = props

        const data = option.data && typeof option.data === "function" ? option.data(row) : row[option.label]
        return (
            <TableCell>{data}</TableCell>
        )
    }

    return (
        <TableContainer component={Paper}>
            <Table size={"medium"}>
                <RenderTableHead/>
                <RenderTableBody/>
            </Table>
        </TableContainer>
    )

}

export default ReuseTable

import React from "react"
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core"

const ReuseTable = (props) => {
    const {tableHead, rows} = props

    return (
        <TableContainer component={Paper}>
            <Table size={"medium"}>
                <TableHead>
                    <TableRow>
                        {tableHead.map((item, index) => {
                            return (
                                <TableCell key={index}> {item.toUpperCase()} </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows && rows.map((row, index) => {
                        return (
                            <TableRow key={index}>
                                {Object.keys(row).map((key) => {
                                    return (
                                        <TableCell key={`tr-${index}-${key}`}>{row[key]}</TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>

            </Table>
        </TableContainer>
    )

}

export default ReuseTable

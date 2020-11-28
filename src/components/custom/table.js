import React from "react"
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination} from "@material-ui/core"

const ReuseTable = (props) => {
    const {options, rows, pagination, handleQuery} = props

    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10 )

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
                            {options.map((option, key) => {
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        handleQuery({page: newPage, limit: rowsPerPage})
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        handleQuery({page:0, limit: event.target.value})
    };

    return (
        <div>
        {rows !== null ?  <Paper>
            <TableContainer component={Paper}>
                <Table size={"medium"}>
                    <RenderTableHead/>
                    <RenderTableBody/>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[1,5, 10, 25]}
                component="div"
                count={pagination.totalItems}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper> : null }
        </div>

    )
}

export default ReuseTable

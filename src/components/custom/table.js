import React, {useEffect} from "react"
import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core"
import {connect} from "react-redux"
import {loadData} from "../../store/actions/handleRequestActions";


const ReuseTable = (props) => {

    const {options :{headCell, params}, rows, loadData, pagination, loaded, loadError} = props
    const [page, setPage] = React.useState(params.query.page)
    const [rowsPerPage, setRowsPerPage] = React.useState(params.query.perPage)

    useEffect(() => {
        loadData(params)
    }, [loadData, params])

    const RenderTableHead = () => {
        return (
            <TableHead>
                <TableRow>
                    {headCell.map((item, index) => {
                        return <TableCell key={index}> {item.label.toUpperCase()} </TableCell>
                    })}
                </TableRow>
            </TableHead>
        )
    }

    const RenderTableBody = () => {
        return (
            <TableBody>
                { !loadError && rows ? rows.map((row, index) => {
                    return (
                        <TableRow key={index}>
                            {headCell.map((option, key) => {
                                return (
                                    <RenderTableRow key={key} row={row} option={option}/>
                                )
                            })}
                        </TableRow>
                    )
                }) : (<RenderTableError  />)}
            </TableBody>
        )
    }

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        params['query']['page'] = newPage
        loadData(params)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        params['query']['perPage'] = event.target.value
        loadData(params)
    }


    return (
        <div>
            {loaded ? <Paper>
                <TableContainer component={Paper}>
                    <Table size={"medium"}>
                        <RenderTableHead/>
                        <RenderTableBody/>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[1, 5, 10, 25]}
                    component="div"
                    count={pagination.totalItems}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper> : <CircularProgress color={"primary"}/>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loaded: state.request.loaded,
        rows: state.request.data,
        pagination: state.request.pagination,
        loadError: state.request.loadingError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (params) => dispatch(loadData(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReuseTable)

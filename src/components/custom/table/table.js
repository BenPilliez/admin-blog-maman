import React, {useEffect} from "react"
import {
    CircularProgress,
    IconButton,
    Paper,
    Table,
    TableContainer,
    TablePagination,
    Toolbar,
    Tooltip,
    Typography
} from "@material-ui/core"
import {connect} from "react-redux"
import RenderTableHead from "./tableHeader"
import RenderTableBody from "./tableBody"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {loadData} from "../../../store/actions/handleRequestActions"
import {makeStyles} from "@material-ui/core/styles";

const styles = makeStyles((theme)=> ({
    title: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}))

const ReuseTable = (props) => {

    const classes = styles()
    const {options: {headCell, params, tableTile, actions, deleteAction}, rows, loadData, pagination, loaded, loadError, needUpdate} = props
    const [direction, setDirection] = React.useState(params.query.order[1])
    const [orderBy, setOrderBy] = React.useState(params.query.order[0])
    const [page, setPage] = React.useState(params.query.page)
    const [rowsPerPage, setRowsPerPage] = React.useState(params.query.perPage)
    const [selected, setSelected] = React.useState([])
    const [isMounted, setIsMounted] = React.useState(false)

    console.log(isMounted, needUpdate)

    useEffect(() => {
        if(!isMounted || needUpdate){
            loadData(params)
            setIsMounted(true)
            setSelected([])
        }
    }, [loadData,isMounted, needUpdate, params])

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

    const handleSort = (property) => {
        const isAsc = orderBy === property && direction === 'asc'
        const order = isAsc ? 'desc' : 'asc'
        setDirection(order)
        setOrderBy(property)
        params['query']['order'] = [property, order]
        loadData(params)
    }

    const handleSelect = (event, id) => {

        const selectedIndex = selected.indexOf(id)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected)
    }

    const CustomToolBar = (props) => {
        const {tableName} = props
        return (
            <Toolbar className={classes.title} >
            {selected.length > 0 ? <Typography color="inherit" variant="subtitle1" component="div">
                {selected.length} selectionnées
            </Typography> : <Typography component={"div"} variant={"h6"}>{tableName}</Typography>}

            {selected.length > 0 ? (
                <Tooltip title="Supprimer">
                    <IconButton aria-label="delete" onClick={() => deleteAction(selected)}>
                        <FontAwesomeIcon icon={"trash"} color={"red"}/>
                    </IconButton>
                </Tooltip>
            ) : null}
        </Toolbar>)
    }

    return (
        <div>
            {loaded ? <Paper>
                <CustomToolBar tableName={tableTile}/>
                <TableContainer component={Paper}>
                    <Table size={"medium"}>
                        <RenderTableHead deleteAction={deleteAction}  direction={direction} headCell={headCell} orderBy={orderBy} handleSort={handleSort} />
                        <RenderTableBody headCell={headCell} actions={actions} selected={selected} loadError={loadError} rows={rows} handleSelect={handleSelect} />
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

import React, {useEffect} from "react"
import {connect} from "react-redux"
import {
    CircularProgress,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    TablePagination,
    Typography
} from "@material-ui/core"
import CustomMenu from "../custom/menu"
import {loadData} from "../../store/actions/handleRequestActions"
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    spacing: {
        marginBottom: theme.spacing(2)
    }
}))

const ReuseList = (props) => {

    const classes = useStyles()
    const {
        options: {text, secondaryText, actions, deleteAction, params},
        needUpdate,
        rows,
        loadData,
        pagination,
        loadError
    } = props
    const [page, setPage] = React.useState(params.query.page)
    const [rowsPerPage, setRowsPerPage] = React.useState(params.query.perPage)
    const [isMounted, setIsMounted] = React.useState(false)

    useEffect(() => {
        if (!isMounted || needUpdate) {
            loadData(params)
            setIsMounted(true)
        }
    }, [loadData, isMounted, needUpdate, params])

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

    const RenderSecondaryItem = (props) => {
        const {item, row} = props
        const data = typeof item.data === "function" ? item.data(row) : row[item.label]
        return <Typography variant={"subtitle2"}>{data}</Typography>
    }

    const RenderItemError = () => {
        return (
            <ListItem>
                <ListItemText>
                    {loadError}
                </ListItemText>
            </ListItem>
        )
    }

    return (
        <div>
            {isMounted ?
                <Paper>
                    <List>
                        {!loadError && rows ? rows.map((row, index) => {
                            return <ListItem key={index}>
                                <ListItemText
                                    disableTypography={true}
                                    primary={text.data(row)}
                                    secondary={ secondaryText && secondaryText.map((item, index) => {
                                                return (<RenderSecondaryItem key={index} row={row} item={item}/>)
                                            })
                                    }/>
                                <ListItemSecondaryAction>
                                    <CustomMenu menuitemlists={actions} id={row.id} deleteaction={deleteAction}/>
                                </ListItemSecondaryAction>

                            </ListItem>
                        }) : (<RenderItemError/>)}
                    </List>
                    <TablePagination
                        className={classes.spacing}
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
        rows: state.request.data,
        pagination: state.request.pagination,
        loadError: state.request.loadingError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (params) => dispatch(loadData(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReuseList)

import React, {useEffect} from "react"
import {connect} from "react-redux"
import {Card, CircularProgress, Grid, TablePagination} from "@material-ui/core"
import RenderCardHeader from "./cardHeader"
import RenderCardContent from "./cardContent"
import RenderCardMedia from "./cardMedia"
import RenderCardActions from "./cardActions"
import {loadData} from "../../../store/actions/handleRequestActions"


const ReuseCardList = (props) => {
    let {
        options: {cardMedia, cardHeader, cardContent, cardActions, params},
        rows,
        loadData,
        pagination,
        needUpdate,
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

    return (
        <div>
            {isMounted ? <div>
                <Grid container>
                    {!loadError && rows ? rows.map((row, index) => {
                        return (<Grid item key={index} xs={12} lg={3} md={3} sm={12}>
                            <Card>
                                {cardHeader && cardHeader.length > 0 ?
                                    <RenderCardHeader headerCard={cardHeader} row={row}/> : null}
                                {cardMedia ? <RenderCardMedia media={cardMedia} row={row}/> : null}
                                <RenderCardContent content={cardContent} row={row}/>
                                {cardActions && cardActions.length > 0 ?
                                    <RenderCardActions row={row} actions={cardActions}/> : null}
                            </Card>
                        </Grid>)
                    }) : <div>{loadError}</div>}
                </Grid>
                <TablePagination
                    rowsPerPageOptions={[1, 5, 10, 25]}
                    component="div"
                    count={pagination.totalItems}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </div> : <CircularProgress color={"primary"}/>}
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
        loadData: (params) => dispatch(loadData(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReuseCardList)

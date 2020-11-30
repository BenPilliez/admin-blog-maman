import React, {useEffect} from "react"
import {connect} from "react-redux"
import {CircularProgress, TablePagination,Grid,Card, makeStyles,CardMedia, CardContent, Typography, CardActions, Button} from "@material-ui/core"
import {loadData} from "../../store/actions/handleRequestActions"

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const ReuseCardList = (props) => {

    const {options: {buttons,params}, rows, loadData, pagination, loaded, loadError} = props
    const [page, setPage] = React.useState(params.query.page)
    const [rowsPerPage, setRowsPerPage] = React.useState(params.query.perPage)

    useEffect(() => {
        loadData(params)
    }, [loadData, params])

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



    const classes = useStyles()
    return (

        <div>
            {loaded ?
                <div>
                    <Grid container>
                        {rows && rows.map((row, index) => {
                            const image = row.photos ? `${process.env.REACT_APP_BASE_PUBLIC_URL}/${row.photos[0]}` : `${process.env.REACT_APP_BASE_PUBLIC_URL}/nature.jpg`
                           return( <Grid item key={index} xs={12} lg={3} md={3} sm={12} >
                                <Card >
                                    <CardMedia
                                        className={classes.media}
                                        image={image}
                                        title="Image posts"
                                    />
                                    <CardContent>
                                        <Typography  variant="h5" component="h2">
                                            {row.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary"  dangerouslySetInnerHTML={{__html: row.content}}>
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        {buttons && buttons.map((button, index) => {
                                           return( <Button size="small" color="primary" key={index}>
                                                {button.label}
                                            </Button>)
                                        })}
                                    </CardActions>
                                </Card>
                            </Grid>)
                        })}
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

import React from "react"
import {connect} from "react-redux"
import {Box, CardMedia, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    media: {
        height: '200px',
        width: '200px'
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: theme.spacing(2)
    }
}))

const CommentDetail = (props) => {

    const {comment} = props
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <CardMedia className={classes.media} image={`${process.env.REACT_APP_BASE_PUBLIC_URL}/${comment.user.avatar}`}/>
            <Box className={classes.flexColumn}>
            </Box>
        </Box>
    )

}

const mapStateToProps = (state, ownProps) => {
    const comment = state.request.data.find((item) => {
        return item.id === ownProps.commentId
    })

    return {
        comment: comment
    }
}

export default connect(mapStateToProps)(CommentDetail)

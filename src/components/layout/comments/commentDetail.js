import React from "react"
import {connect} from "react-redux"
import {Avatar, Container, Grid, Typography} from "@material-ui/core"
import clsx from "clsx"
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10)
    },
    spacing: {
        marginTop: theme.spacing(3)
    },
    content: {
        width: '100%'
    }
}))

const CommentDetail = (props) => {

    const {comment} = props
    const classes = useStyles()

    return (
        <Container>
            <Grid container>
                <Grid container item justify="center" xs={12}>
                    <Avatar alt={"user avatar"} className={classes.large}
                            src={`${process.env.REACT_APP_BASE_PUBLIC_URL}/${comment.user.avatar}`}/>
                </Grid>
                <Grid container item xs={12} className={classes.spacing}>
                    <Typography className={classes.content} variant={"body1"}>{comment.content}</Typography>
                    <Typography className={clsx(classes.content, classes.spacing)} align={"left"}
                                color={"textSecondary"}>{comment.user.username} {comment.createdAt} {comment.published ? 'Publié' : 'Non publié'}</Typography>
                </Grid>

            </Grid>
        </Container>
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

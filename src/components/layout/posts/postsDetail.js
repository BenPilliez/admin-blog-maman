import React from "react"
import {connect} from "react-redux"
import {CardMedia, Container, Grid, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9,
        margin: theme.spacing(1)
    }
}))

const PostDetail = (props) => {

    const {post} = props
    const classes = useStyle()

    return (
        <React.Fragment>
            <Container>
                <Grid container justify={"center"}>
                    <Grid item xs={12}>
                        <Typography align={"center"} variant={"h4"}>
                            {post.title}
                        </Typography>
                    </Grid>
                    {post.photos && post.photos.map((item, index) =>
                        <Grid item key={index} xs={index === 0 ? 12 : 6}>
                            <CardMedia className={classes.media}
                                       image={`${process.env.REACT_APP_BASE_PUBLIC_URL}/${item}`}/>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Typography align={"center"} variant={"body1"} dangerouslySetInnerHTML={{__html: post['content']}}/>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant={"caption"} color={"textSecondary"}>
                            {post.createdAt}, {post.user.username},
                            status: {post.published === false ? 'Non publié' : 'Publié'}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}
const mapStateTopProps = (state, ownProps) => {
    const post = state.request.data.find(((item) => {
        return item.id === ownProps.postId
    }))
    return {
        post: post
    }
}

export default connect(mapStateTopProps)(PostDetail)

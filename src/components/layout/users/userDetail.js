import React from "react"
import {connect} from "react-redux"
import {makeStyles} from "@material-ui/core/styles";
import {Box, CardMedia, Typography} from "@material-ui/core"

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

const UserDetail = (props) => {

    const {user} = props
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <CardMedia className={classes.media} image={`${process.env.REACT_APP_BASE_PUBLIC_URL}/${user.avatar}`} />
            <Box className={classes.flexColumn}>
                <Typography variant={"body1"}>Email : {user.email}</Typography>
                <Typography variant={"body1"}>ROLES: {user.ROLES.join(', ')}</Typography>
                <Typography variant={"body1"}>D'autre stats sont à venir</Typography>
            </Box>
        </Box>
    )
}

const mapStateToProps = (state, ownProps) => {
    const user = state.request.data.find((item) => {
        return item.id === ownProps.userId
    })

    return{
        user: user
    }
}

export default connect(mapStateToProps)(UserDetail)

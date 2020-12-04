import React from "react"
import {CardMedia} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}))

const RenderCardMedia = (props) => {

    const {media, row} = props
    const classes = useStyle()

    const renderUrl = () => {
        return typeof media === "function" ? media(row) : row[media]
    }

    return (
        <CardMedia
            className={classes.media}
            image={renderUrl()}
            title="Image posts"
        />
    )

}

export default RenderCardMedia

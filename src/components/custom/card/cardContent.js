import React from "react"
import {CardContent, Typography} from "@material-ui/core"

const RenderCardContent = (props) => {
    const {content, row} = props

    const RenderContent = () => {
       return  typeof content === "function" ? content(row) : row[content]
    }

    return (
        <CardContent>
            <Typography>
                <RenderContent/>
            </Typography>
        </CardContent>
    )
}

export default RenderCardContent

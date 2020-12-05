import React from "react"
import {Avatar, CardHeader} from "@material-ui/core";
import CustomMenu from "../menu";

const RenderCardHeader = (props) => {
    const {headerCard, row} = props

    const ReturnData = (option) => {
        return typeof option === "function" ? option(row) : row[option]
    }

    return (
        <React.Fragment>
            {headerCard && headerCard.map((item, index) => {
                return <CardHeader
                    key={index}
                    avatar={item.avatar ? <Avatar src={ReturnData(item.avatar)}/> : null}
                    title={item.title ? ReturnData(item.title) : null}
                    subheader={item.subheader ? ReturnData(item.subheader) : null}
                    action={item.action ? <CustomMenu id={row.id} menuitemlists={item.action}/> : null}
                />
            })}
        </React.Fragment>
    )
}

export default RenderCardHeader

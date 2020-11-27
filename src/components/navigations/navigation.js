import React from "react"
import {useMediaQuery} from "@material-ui/core"
import MobileNavigation from "./mobile";
import DestokNavigation from "./desktop";


const Navigation = (props) => {

    React.useEffect(() => {
        if (props.dataLoading) {
            props.getNotifications()
        }
    })

    console.log()

    const matches = useMediaQuery(theme => theme.breakpoints.down('sm') || theme.breakpoints.down('xs'));

    return (
        matches === true ? (<MobileNavigation items={JSON.parse(process.env.REACT_APP_MENU)}/>) : (<DestokNavigation items={JSON.parse(process.env.REACT_APP_MENU)}/>)
    )
}


export default Navigation

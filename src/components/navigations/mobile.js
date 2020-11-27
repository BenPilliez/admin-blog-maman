import React from "react"
import {AppBar, Tab, Tabs} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link as RouterLink} from "react-router-dom"


const useStyles = makeStyles((theme) => ({
    root: {
        top: 'auto',
        bottom: 0,
        width: "100%",
        backgroundColor: theme.palette.primary.main,

    },
    flexContainer: {
        justifyContent: 'space-between'
    }
}))

const MobileNavigation = (props) => {

    const {items} = props
    const classes = useStyles()
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <AppBar position="fixed" className={classes.root} value={value}>
            <Tabs
            value={value}
            classes={{flexContainer: classes.flexContainer}}
            onChange={handleChange}
            variant={"scrollable"}
            scrollButtons={"auto"}
            indicatorColor={"secondary"}
            textColor={"secondary"}
            >
                {items.map((item, index) => {
                    return (
                        <Tab value={index} key={index} component={item.link ? RouterLink : 'button'}
                             to={item.link}
                             icon={<FontAwesomeIcon size={"lg"} icon={item.icon} />} />
                    )
                })}

            </Tabs>
        </AppBar>
    )
}


export default MobileNavigation

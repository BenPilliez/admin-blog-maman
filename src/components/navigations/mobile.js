import React from "react"
import {AppBar, Tab, Tabs} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Link as RouterLink} from "react-router-dom"
import {signOut} from "../../store/actions/authActions"
import {connect} from "react-redux"


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

    const {items, signout} = props
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
                        <Tab value={index} key={index} onClick={item.signout ? signout : null} component={item.link ? RouterLink : 'button'}
                             to={item.link}
                             icon={<FontAwesomeIcon color={item.signout ? 'red' : "white"} size={"lg"} icon={item.icon} />} />
                    )
                })}

            </Tabs>
        </AppBar>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signout: () => dispatch(signOut())
    }
}


export default connect(null, mapDispatchToProps)(MobileNavigation)

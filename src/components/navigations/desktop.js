import React from "react"
import clsx from "clsx"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core"
import {Link as RouterLink} from 'react-router-dom'
import {connect} from "react-redux"
import {signOut} from "../../store/actions/authActions"

const drawerWidth = 240

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',

    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    listItem: {
      marginTop: theme.spacing(5)
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: theme.palette.primary.main
    },
    selected:{
        color: theme.palette.secondary.main
    },
    notSelected:{
        color: 'white'
    },
    logout:{
      color: 'red'
    },
    drawerClose:{
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7) + 1,
        overflowX: 'hidden',
        backgroundColor: theme.palette.primary.main

    }
}))


const DestokNavigation = (props) => {
    const {items,signout} = props
    const classes = useStyle()
    const [open, setOpen] = React.useState(false)
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleMenuItemClick = (event, index, title) => {

        setOpen(false)
        setSelectedIndex(index)
    }

    return (
        <div className={classes.root}>
            <Drawer
                onMouseOver={open === false ? handleOpen : null}
                onMouseLeave={handleClose}
                variant={"permanent"}
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })
                }}
            >
                <List>
                    {items.map((item, index) => {
                            return <ListItem selected={index === selectedIndex}
                                             onClick={ item.signout ? signout : (event) => handleMenuItemClick(event, index)}
                                             className={classes.listItem} button={!item.link}
                                             component={item.link ? RouterLink : ""}
                                             to={item.link}
                                             key={index}>
                                <ListItemIcon><FontAwesomeIcon className={clsx(classes.drawer, {
                                    [classes.selected]: index === selectedIndex,
                                    [classes.notSelected]: !index === selectedIndex,
                                    [classes.logout]: item.signout
                                })} size="lg" icon={item.icon}/></ListItemIcon>
                                <ListItemText style={{color: 'white'}} primary={item.title}/>
                            </ListItem>
                    })}
                </List>
            </Drawer>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signout: () => dispatch(signOut())
    }
}

export default connect(null,mapDispatchToProps)(DestokNavigation)

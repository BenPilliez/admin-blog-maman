import React from "react"
import PropTypes from 'prop-types'
import {IconButton, Menu, MenuItem} from "@material-ui/core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


const CustomMenu = (props) => {

    const {menuitemlists,userid,deleteaction} = props
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleOpen = () => {
        setAnchorEl(null)
    }

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="list-actions"
                onClick={handleClick}
            >
                <FontAwesomeIcon icon={"ellipsis-v"}/>
            </IconButton>
            <Menu open={open} keepMounted anchorEl={anchorEl} onClose={handleOpen}>
                    {menuitemlists && menuitemlists.map((item, index) =>
                        <MenuItem key={index} onClick={ () => {handleOpen(); item.handler(userid)}}>{item.label}</MenuItem>
                    )}
                    {deleteaction ? <MenuItem onClick={() => {handleOpen(); deleteaction(userid)}}>Supprimer</MenuItem> : null }
            </Menu>
        </div>

    )
}

CustomMenu.propTypes = {
    menuitemlists: PropTypes.array.isRequired
}

export default CustomMenu

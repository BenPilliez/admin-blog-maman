import React, {useEffect} from "react"
import {connect} from "react-redux"
import ReuseTable from "../../custom/table/table"
import ReuseList from "../../custom/list"
import moment from "moment"
import {useMediaQuery} from "@material-ui/core"
import "moment/locale/fr"
import CustomDialog from "../../custom/customDialog"
import {Button} from "@material-ui/core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import FormUser from "./formUser"
import {makeStyles} from "@material-ui/core/styles"
import {deleteUsers,resetState} from "../../../store/actions/usersActions"
import UserDetail from "./userDetail"
import {resetRequest} from "../../../store/actions/handleRequestActions";

const useStyle = makeStyles((theme) => ({
    root: {
        border : 'none',
        [theme.breakpoints.up('md')]:{
            float: 'right',
            margin: theme.spacing(1)
        }
    }
}))

const Users = (props) => {

    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm') || theme.breakpoints.down('xs'), {noSsr: true})
    const classes = useStyle()
    const {success, deleteUser,reset} = props
    const [edit, setEdit] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [openShow, setOpenShow] = React.useState(false)
    const [userId, setUserId] = React.useState()
    const [needUpdate, setNeedUpdate] = React.useState(false)

    useEffect(() => {
        if(success){
            setNeedUpdate(true)
            reset()
        }
    },[success,setNeedUpdate,reset])

    const params = {
        query: {
            perPage: 10, page: 0, order: ['id', 'asc']
        },
        url: 'users'
    }

    const actions = [
        {
            label: 'Voir',
            icon: 'eye',
            action: 'show',
            handler: (id) => {
                setOpenShow(true)
                setNeedUpdate(false)
                setUserId(id)
            }
        },
        {
            label: 'Editer',
            action: 'edit',
            icon: 'edit',
            handler: (id) => {
                setEdit(true)
                setOpen(true)
                setNeedUpdate(false)
                setUserId(id)
            }
        },
    ]



    const deleteAction = (ids) => {
        deleteUser(ids)
    }

    const handleDialogShow = () => {
        setOpenShow(!openShow)
    }

    const handleDialog = () => {
        setOpen(!open)
        setEdit(false)
        setUserId(null)
    }

    const handleUpdate = () => {
        setNeedUpdate(true)
    }

    return (
        <div>
            <Button className={classes.root} color={"primary"} variant={"outlined"} onClick={handleDialog} startIcon={<FontAwesomeIcon icon={"plus"} />}>Créer</Button>
            {!matches ? <ReuseTable needUpdate={needUpdate} options={
                {
                    tableTile: 'Utilisateurs',
                    headCell: [
                        {
                            label: "id",
                            sorting: true,
                        },
                        {
                            label: "Roles",
                            data: (row) => row && row.ROLES ? row.ROLES.join(',') : null
                        },
                        {
                            label: 'email',
                            sorting: true,
                        },
                        {
                            label: "Membre depuis",
                            bddName: 'createdAt',
                            sorting: true,
                            data: (row) => moment(row.createdAt).format('LL')
                        }
                    ],
                    actions: actions,
                    deleteAction: deleteAction,
                    params: {
                        query:
                            {
                                perPage: 10, page: 0, order: ['id', 'asc']
                            },
                        url: 'users'
                    }
                }}
            /> : <ReuseList
                needUpdate={needUpdate}
                options={{
                    text: {data: (row) => row.email},
                    secondaryText: [
                        {
                            label: "roles: ",
                            data: (row) => row && row.ROLES ? row.ROLES.join(',') : null
                        },
                        {
                            label: "membre depuis le: ",
                            data: (row) => row.createdAt
                        }
                    ],
                    actions: actions,
                    deleteAction: deleteAction,
                    params: params
                }
                }/>}
            <CustomDialog
                title={edit ? "Editer" : "Créer un utilisateur"}
                isOpen={open}
                fullScreen={matches}
                handleClose={handleDialog}
            >
                <FormUser isEdit={edit} userId={userId} handleUpdate={handleUpdate} handleDialogClose={handleDialog}/>
            </CustomDialog>

            <CustomDialog
                title={"Jeter un oeil"}
                isOpen={openShow}
                fullScreen={matches}
                handleClose={handleDialogShow}
                dialogActions={[{label: 'Editer', handler: () => {
                        setEdit(true)
                        setOpen(true)
                        setOpenShow(false)
                }},{label: 'Fermer'}]}
            >
                <UserDetail userId={userId} />
            </CustomDialog>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        success: state.users.success,
        error: state.users.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: (ids) => dispatch(deleteUsers(ids)),
        reset: () => dispatch(resetState())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Users)

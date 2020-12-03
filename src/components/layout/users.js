import React from "react"
import ReuseTable from "../custom/table/table"
import ReuseList from "../custom/list"
import moment from "moment"
import {useMediaQuery} from "@material-ui/core"
import "moment/locale/fr"
import CustomDialog from "../custom/customDialog"
import {Button} from "@material-ui/core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import FormUser from "./formUser"
import {makeStyles} from "@material-ui/core/styles"
import UserDetail from "./userDetail"

const useStyle = makeStyles((theme) => ({
    root: {
        border : 'none',
        [theme.breakpoints.up('md')]:{
            float: 'right',
            margin: theme.spacing(1)
        }
    }
}))

const Users = () => {

    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm') || theme.breakpoints.down('xs'), {noSsr: true})
    const classes = useStyle()
    const [edit, setEdit] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [openShow, setOpenShow] = React.useState(false)
    const [userId, setUserId] = React.useState()


    const params = {
        query: {
            perPage: 10, page: 0, order: ['id', 'asc']
        },
        url: 'users'
    }

    const deleteAction = () => {
        console.log('Delete function')
    }

    const handleDialogShow = () => {
        setOpenShow(!openShow)
    }

    const actions = [
        {
            label: 'Voir',
            icon: 'eye',
            action: 'show',
            handler: (id) => {
                setOpenShow(true)
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
                setUserId(id)
            }
        },
    ]

    const handleDialog = () => {
        setOpen(!open)
        setEdit(false)
        setUserId(null)
    }

    return (
        <div>
            <Button className={classes.root} color={"primary"} variant={"outlined"} onClick={handleDialog} startIcon={<FontAwesomeIcon icon={"plus"} />}>Créer</Button>
            {!matches ? <ReuseTable options={
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
                    deleteAction: deleteAction(),
                    params: {
                        query:
                            {
                                perPage: 10, page: 0, order: ['id', 'asc']
                            },
                        url: 'users'
                    }
                }}
            /> : <ReuseList
                options={{
                    text: {data: (row) => row.email},
                    secondaryText: [
                        {
                            label: "roles: ",
                            data: (row) => row && row.ROLES ? row.ROLES.join(',') : null
                        },
                        {
                            label: "membre depuis le: ",
                            data: (row) => moment(row.createdAt).format('LL')
                        }
                    ],
                    actions: actions,
                    deleteAction: deleteAction(),
                    params: params
                }
                }/>}
            <CustomDialog
                title={edit ? "Editer" : "Créer un utilisateur"}
                isOpen={open}
                fullScreen={true}
                handleClose={handleDialog}
            >
                <FormUser isEdit={edit} userId={userId} handleDialogClose={handleDialog}/>
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

export default Users

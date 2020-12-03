import React from "react"
import ReuseTable from "../custom/table/table"
import ReuseList from "../custom/list"
import moment from "moment"
import {useMediaQuery} from "@material-ui/core"
import "moment/locale/fr"
import CustomDialog from "../custom/customDialog"
import {Button} from "@material-ui/core"
import FormUser from "./formUser"


const Users = () => {

    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm') || theme.breakpoints.down('xs'), {noSsr: true})
    const [edit, setEdit] = React.useState(false)
    const [open, setOpen] = React.useState(false)
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

    const actions = [
        {
            label: 'Voir',
            icon: 'eye',
            action: 'show',
            handler: () => {
                console.log('Show modal')
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
    }

    return (
        <div>
            <Button onClick={handleDialog}>Créer</Button>
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
                handleClose={handleDialog}
            >
                <FormUser isEdit={edit} userId={userId}/>
            </CustomDialog>
        </div>
    )
}

export default Users

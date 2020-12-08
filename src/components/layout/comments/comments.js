import React from "react"
import {connect} from "react-redux"
import ReuseTable from "../../custom/table/table"
import {FormControl, Switch, useMediaQuery} from "@material-ui/core"
import CustomDialog from "../../custom/customDialog"
import CommentDetail from "./commentDetail"

const Comments = (props) => {

    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm') || theme.breakpoints.down('xs'), {noSsr: true})

    const [open, setOpen] = React.useState(false)
    const [commentId, setCommentId] = React.useState()
    const [needUpdate, setNeedUpdate] = React.useState(false)

    const actions = [
        {
            label: 'Voir',
            icon: 'eye',
            action: 'show',
            handler: (id) => {
                setOpen(true)
                setNeedUpdate(false)
                setCommentId(id)
            }
        }]

    const handleDialog = () => {
        setOpen(!open)
    }


    const deleteAction = (ids) => {
        console.log(ids)
    }
    return (
        <React.Fragment>
            <ReuseTable
                needUpdate={needUpdate}
                options={
                    {
                        tableTile: 'Commentaires',
                        headCell: [
                            {
                                label: "id",
                                sorting: true,
                            },
                            {
                                label: "Utilisateur",
                                bddName: 'username',
                                data: (row) => row.user.username
                            },
                            {
                                label: 'Status',
                                bddName: 'published',
                                sorting: true,
                                data: (row) => <FormControl>
                                    <Switch
                                        checked={!!row.published}
                                        onChange={(event) => {
                                            console.log(row.id, event.target.checked)

                                        }}
                                    />
                                </FormControl>
                            },
                            {
                                label: 'Ajouté le ',
                                bddName: 'createdAt',
                                sorting: true,
                                data: (row) => row.createdAt
                            }
                        ],
                        actions: actions,
                        deleteAction: deleteAction,
                        params: {
                            query:
                                {
                                    perPage: 10, page: 0, order: ['id', 'asc']
                                },
                            url: 'comments'
                        }
                    }}
            />

            <CustomDialog
                title={"Jeter un oeil"}
                isOpen={open}
                fullScreen={matches}
                handleClose={handleDialog}
                dialogActions={[{label: 'Fermer'}]}
            >
                <CommentDetail commentId={commentId} />
            </CustomDialog>
        </React.Fragment>
    )
}

export default connect(null, null)(Comments)

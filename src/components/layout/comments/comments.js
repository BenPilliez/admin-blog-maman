import React from "react"
import {connect} from "react-redux"
import ReuseTable from "../../custom/table/table"
import {FormControl, Switch} from "@material-ui/core";

const Comments = (props) => {

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
        },
        /*{
            label: 'Publier',
            type: 'switch',
            action: 'published',
            labelPlacement: 'start',
            handler: (id) => {

            }
        }*/
    ]


    /*return (
        <TableCell>
            <FormControl >
                <FormControlLabel
                    labelPlacement={action.labelPlacement}
                    control={<Switch
                        checked={!!row.published}
                        onChange={(event) => {
                            setChecked(event.target.checked)
                            action.handler(row.id, event.target.checked)
                        }}/>}
                    label={action.label}/>
            </FormControl>
        </TableCell>
    )*/
    const deleteAction = (ids) => {
        console.log(ids)
    }
    return (
        <React.Fragment>
            <ReuseTable
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
                                sorting: true,
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
            >

            </ReuseTable>
        </React.Fragment>
    )
}

export default connect(null, null)(Comments)

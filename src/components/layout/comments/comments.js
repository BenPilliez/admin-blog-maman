import React, {useEffect} from "react"
import {connect} from "react-redux"
import ReuseTable from "../../custom/table/table"
import {useMediaQuery} from "@material-ui/core"
import CustomDialog from "../../custom/customDialog"
import CommentDetail from "./commentDetail"
import {resetState, setPublished,deleteComments} from "../../../store/actions/commentsActions"

const Comments = (props) => {

    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm') || theme.breakpoints.down('xs'), {noSsr: true})

    const [open, setOpen] = React.useState(false)
    const [commentId, setCommentId] = React.useState()
    const [needUpdate, setNeedUpdate] = React.useState(false)

    const {published, deleteComments, reset, success} = props

    useEffect(() => {
        if (success && needUpdate) {
            reset()
        }
    }, [success, needUpdate])

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
        deleteComments(ids)
        setNeedUpdate(true)
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
                                type: 'switch',
                                data: (row) => row.published,
                                handler: (id, value) => {
                                    published(id, value)
                                    setNeedUpdate(false)
                                }
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
                <CommentDetail commentId={commentId}/>
            </CustomDialog>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        success: state.comments.success
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        published: (id, value) => dispatch(setPublished(id, value)),
        deleteComments: (ids) => dispatch(deleteComments(ids)),
        reset: () => dispatch(resetState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)

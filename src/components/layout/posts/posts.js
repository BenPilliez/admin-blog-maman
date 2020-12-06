import React, {useEffect} from "react"
import {connect} from "react-redux"
import ReuseCardList from "../../custom/card/cardList"
import CustomDialog from "../../custom/customDialog"
import PostDetail from "./postsDetail"
import {resetState,deletePost, setPublished} from "../../../store/actions/postsActions"
import {Button} from "@material-ui/core"
import FormPost from "./formPosts"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {makeStyles} from "@material-ui/core/styles"


const useStyle = makeStyles((theme) => ({
    root: {
        border: 'none',
        [theme.breakpoints.up('md')]: {
            float: 'right',
            margin: theme.spacing(1)
        }
    }
}))

const Posts = (props) => {

    const {published, success,deletePost, reset} = props
    const classes = useStyle()
    const [openShow, setOpenShow] = React.useState(false)
    const [edit, setEdit] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [postId, setPostId] = React.useState()
    const [needUpdate, setNeedUpdate] = React.useState(false)

    const handleClose = () => {
        setOpenShow(!openShow)
    }

    const handleDialog = () => {
        setOpen(!open)
        setEdit(false)
        setPostId(null)
    }

    const handleUpdate = () => {
        setNeedUpdate(true)
    }

    useEffect(() => {
        if (success) {
            setNeedUpdate(true)
            reset()
        }
    }, [success, setNeedUpdate])

    return (
        <React.Fragment>
            <Button className={classes.root} color={"primary"} variant={"outlined"} onClick={handleDialog}
                    startIcon={<FontAwesomeIcon icon={"plus"}/>}>Créer</Button>
            <ReuseCardList
                needUpdate={needUpdate}
                options={
                    {
                        cardHeader: [{
                            value: true,
                            avatar: (row) => `${process.env.REACT_APP_BASE_PUBLIC_URL}/${row.user.avatar}`,
                            title: (row) => row.title,
                            subheader: (row) => row.createdAt,
                            action: [
                                {
                                    label: 'Editer',
                                    handler: (id) => {
                                        setEdit(true)
                                        setOpen(true)
                                        setNeedUpdate(false)
                                        setPostId(id)
                                    }
                                },
                                {
                                    label: 'Supprimer',
                                    handler: (id) => {
                                        deletePost(id)
                                    }
                                }
                            ]
                        }],
                        cardMedia: (row) => row.photos ? `${process.env.REACT_APP_BASE_PUBLIC_URL}/${row.photos[0]}` : `${process.env.REACT_APP_BASE_PUBLIC_URL}/nature.jpg`,
                        cardContent: (row) => row.content,
                        cardActions: [
                            {
                                label: 'show',
                                icon: 'eye',
                                handler: (id) => {
                                    setPostId(id)
                                    setOpenShow(true)
                                    setNeedUpdate(false)
                                }
                            }
                        ],
                        cardSwitch: {
                            label: 'Publier',
                            labelPlacement: 'start',
                            type: 'switch',
                            handler: (id, value) => {
                                published(id, value)
                            }
                        },
                        params: {
                            query: {
                                perPage: 10,
                                page: 0,
                                order: ['createdAt', 'asc']
                            },
                            url: 'posts'
                        }
                    }
                }
            />
            <CustomDialog
                isOpen={openShow}
                fullScreen={true}
                handleClose={handleClose}
                title={'Detail Artcile'}>
                <PostDetail postId={postId}/>
            </CustomDialog>

            <CustomDialog
                title={edit ? "Editer" : "Ajouter un article"}
                isOpen={open}
                fullScreen={true}
                handleClose={handleDialog}
            >
                <FormPost isEdit={edit} postId={postId} handleUpdate={handleUpdate} handleDialogClose={handleDialog}/>
            </CustomDialog>
        </React.Fragment>
    )

}

const mapStateToProps = (state) => {
    return {
        success: state.posts.success,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        published: (id, value) => dispatch(setPublished(id, value)),
        deletePost: (id) => dispatch(deletePost(id)),
        reset: () => dispatch(resetState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)

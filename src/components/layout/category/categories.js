import React, {useEffect} from "react"
import {connect} from "react-redux"
import {Button, useMediaQuery} from "@material-ui/core"
import {deleteCategory, resetState} from "../../../store/actions/categoriesActions"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import moment from "moment"
import "moment/locale/fr"
import ReuseTable from "../../custom/table/table"
import ReuseList from "../../custom/list"
import {makeStyles} from "@material-ui/core/styles"
import CustomDialog from "../../custom/customDialog"
import FormCategory from "../category/formCategory"
import {resetRequest} from "../../../store/actions/handleRequestActions"


const useStyle = makeStyles((theme) => ({
    root: {
        border: 'none',
        [theme.breakpoints.up('md')]: {
            float: 'right',
            margin: theme.spacing(1)
        }
    }
}))

const Categories = (props) => {

    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm') || theme.breakpoints.down('xs'), {noSsr: true})
    const classes = useStyle()
    const {success, reset, categoryDelete} = props
    const [categoryId, setCategoryId] = React.useState(null)
    const [edit, setEdit] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [needUpdate, setNeedUpdate] = React.useState(false)

    useEffect(() => {
        if (success) {
            setNeedUpdate(true)
            reset()
        }

    }, [success, setNeedUpdate, reset])


    const deleteAction = (ids) => {
        categoryDelete(ids)
    }

    const actions = [
        {
            label: 'Editer',
            action: 'edit',
            icon: 'edit',
            handler: (id) => {
                setEdit(true)
                setOpen(true)
                setNeedUpdate(false)
                setCategoryId(id)
            }
        }
    ]

    const handleUpdate = () => {
        setNeedUpdate(true)
    }

    const handleDialog = () => {
        setOpen(!open)
        setEdit(false)
        setCategoryId(null)
    }

    return (
        <div>
            <Button className={classes.root} color={"primary"} variant={"outlined"} onClick={handleDialog}
                    startIcon={<FontAwesomeIcon icon={"plus"}/>}>Créer</Button>
            {!matches ? <ReuseTable needUpdate={needUpdate} options={
                {
                    tableTile: 'Categories',
                    headCell: [
                        {
                            label: "id",
                            sorting: true,
                        },
                        {
                            label: 'Nom Categorie',
                            sorting: true,
                            bddName: 'name',
                            data: (row) => row.name
                        },
                        {
                            label: "Créer le ",
                            data: (row) => moment(row.createdAt).format('LL')
                        }
                    ],
                    deleteAction: deleteAction,
                    actions: actions,
                    params: {
                        query: {
                            perPage: 10,
                            page: 0,
                            order: ['id', 'asc']
                        },
                        url: 'category',
                    }
                }}/> : <ReuseList needUpdate={needUpdate} options={
                {
                    text: {
                        data: (row) => row.name
                    },
                    secondaryText: [{label: "crée le ", data: (row) => row.createdAt}],
                    actions: actions,
                    deleteAction: deleteAction,
                    params: {
                        query: {
                            perPage: 10,
                            page: 0,
                            order: ['id', 'asc']
                        },
                        url: 'category',
                    }
                }}/>}

            <CustomDialog
                title={edit ? "Editer" : "Ajouter une catégorie"}
                isOpen={open}
                fullScreen={matches}
                handleClose={handleDialog}>
                <FormCategory isEdit={edit} categoryId={categoryId} handleUpdate={handleUpdate}
                              handleDialogClose={handleDialog}/>
            </CustomDialog>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        success: state.categories.success
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        categoryDelete: (ids) => dispatch(deleteCategory(ids)),
        reset: () => dispatch(resetState()),
        resetRequestHandler: () => dispatch(resetRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)

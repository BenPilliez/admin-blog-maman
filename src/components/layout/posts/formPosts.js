import React, {useEffect} from "react"
import {connect} from "react-redux"
import {createPost, resetState, updatePost} from "../../../store/actions/postsActions"
import {getCategories} from "../../../store/actions/categoriesActions"
import CustomEditor from "../../custom/editor"
import {DropzoneArea} from "material-ui-dropzone"
import {converFormToFormData} from "../../../helpers/convertFormToFomdata"
import {useForm,Controller} from "react-hook-form"
import {Button, Container, Grid, TextField, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import CustomAutocomplete from "../../custom/autocomplete"

const useStyle = makeStyles((theme) => ({
    flex: {
        display: 'flex',
        justifyContent: 'center'
    },
    image: {
        width: '100px',
        height: '100px'
    },
    wrapper: {
        position: 'relative',
        margin: theme.spacing(1)
    }
}))

const FormPost = (props) => {

    const classes = useStyle()
    const {post, update, create, success, handleDialogClose, reset, handleUpdate,categoriesLoad,categories, getCat} = props
    const [files, setFiles] = React.useState(post ? post.photos : '')

    const defaultValue = post ? {
        title: post.title,
        content: post.content,
        photos: post.photos,
        published: post.published,
        categoryId: post.category,
    } : {
        title: '',
        content: '',
        photos: '',
        published: '',
        categoryId: '',
    }

    const {handleSubmit, errors, control} = useForm({
        mode: "all",
        reValidateMode: 'onChange',
        defaultValues: defaultValue
    })

    const onSubmit = (data) => {
        data.photos = files
        data.categoryId = data.categoryId.id
        const formData = converFormToFormData(data)
        if (post) {
            update(formData, post.id)
        } else {
            create(formData)
        }
    }

    useEffect(() => {
        if(!categoriesLoad){
            getCat()
        }

        return () => {
            if (success) {
                handleDialogClose()
                handleUpdate()
                reset()
            }
        }
    }, [success, handleDialogClose, handleUpdate, reset,categoriesLoad,getCat])

    return (
        <Container style={{marginTop: 15, marginBottom: 100}}>
                <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Controller
                                name={"title"}
                                control={control}
                                rules={
                                    {
                                        required: {
                                            value: true,
                                            message: 'Il me faut un titre'
                                        }
                                    }
                                }
                                render={(props) =>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        error={!!errors.title && !!errors.title.message}
                                        required
                                        fullWidth
                                        id="title"
                                        label="Titre"
                                        name="title"
                                        onChange={props.onChange}
                                        value={props.value}
                                        inputRef={props.ref}
                                        autoFocus
                                    />
                                }
                            >
                            </Controller>
                            {errors.title && (
                            <Typography variant={"subtitle2"} color={"error"}>{errors.title.message}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name={"categoryId"}
                                control={control}
                                render={(props) =>{
                                    return <CustomAutocomplete value={props.value} change={(value) => {
                                        props.onChange(value)
                                    }} options={categories} label={"Categorie"}  id={"categorySelect"}/>
                                }}
                                rules={
                                    {
                                        required: {
                                            value: true,
                                            message: 'Il me faut une categorie'
                                        }
                                    }
                                }
                            >
                            </Controller>
                            {errors.categoryId && (
                            <Typography variant={"subtitle2"} color={"error"}>{errors.categoryId.message}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} >
                            <Controller
                                name={"content"}
                                control={control}
                                render={(props) => {
                                    return <CustomEditor value={props.value} onChange={props.onChange} />
                                }}
                                rules={
                                    {
                                        required: {
                                            value: true,
                                            message: 'Il me faut un contenu'
                                        }
                                    }
                                }
                            >
                            </Controller>
                            {errors.content && (
                            <Typography variant={"subtitle2"} color={"error"}>{errors.content.message}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                render={(props) => {
                                    return <DropzoneArea
                                        multiple
                                        dropzoneText={"Dépose tes photos ou clique"}
                                        acceptedFiles={['image/*']}
                                        onChange={(files) => {
                                            if (files.length === 0 && post && post.photos) {
                                                setFiles(post.photos)
                                            } else {
                                                setFiles(files)
                                            }
                                        }}
                                        filesLimit={3}
                                        maxFileSize={2000000}/>
                                }}
                                name={"photos"}
                                control={control}/>
                        </Grid>
                        <Grid item className={classes.flex} xs>
                            <div className={classes.wrapper}>
                                <Button type={"submit"} variant={"contained"} color={"primary"}>Envoyer</Button>
                            </div>
                        </Grid>
                    </Grid>
                </form>
        </Container>
    )

}

const mapStateToProps = (state, ownProps) => {
    const post = state.request.data.find((item) => {
        return item.id === ownProps.postId
    })

    return {
        post: post,
        success: state.posts.success,
        categories: state.categories.categories,
        categoriesLoad: state.categories.categoriesLoadSuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        create: (data) => dispatch(createPost(data)),
        update: (data, id) => dispatch(updatePost(data, id)),
        getCat: () => dispatch(getCategories()),
        reset: () => dispatch(resetState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPost)

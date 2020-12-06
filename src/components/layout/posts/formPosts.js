import React, {useEffect} from "react"
import {connect} from "react-redux"
import {createPost, resetState, updatePost} from "../../../store/actions/postsActions"
import {getCategories} from "../../../store/actions/categoriesActions"
import Autocomplete from "@material-ui/lab/Autocomplete"
import {DropzoneArea} from "material-ui-dropzone"
import {converFormToFormData} from "../../../helpers/convertFormToFomdata"
import {useForm,Controller} from "react-hook-form"
import {Button, Container, Grid, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

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
    const {post, update, create, success, handleDialogClose, reset, handleUpdate, getCategories} = props
    const [files, setFiles] = React.useState(post ? post.photos : '')

    const defaultValue = post ? {
        title: post.title,
        content: post.content,
        photos: post.photos,
        published: post.published,
        category: post.category.name,
    } : {
        title: '',
        content: '',
        photos: '',
        published: '',
        category: '',
    }

    const {handleSubmit, errors, control, getValues} = useForm({
        mode: "all",
        reValidateMode: 'onChange',
        defaultValues: defaultValue
    })

    const onSubmit = (data) => {
        data.photos = files
        const formData = converFormToFormData(data)
        if (post) {
            update(formData, post.id)
        } else {
            create(formData)
        }
    }

    useEffect(() => {
        return () => {
            if (success) {
                handleDialogClose()
                handleUpdate()
                reset()
            }
        }
    }, [success, handleDialogClose, handleUpdate, reset])

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
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            render={(props) => {
                                return <DropzoneArea
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
        categories: state.categories.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        create: (data) => dispatch(createPost(data)),
        update: (data, id) => dispatch(updatePost(data, id)),
        getCategories: () => dispatch(getCategories()),
        reset: () => dispatch(resetState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPost)

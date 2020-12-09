import React, {useEffect} from "react"
import {createCategory, resetState, updateCategory} from "../../../store/actions/categoriesActions"
import {connect} from "react-redux"
import {Controller} from "react-hook-form"
import {useForm} from "react-hook-form"
import {TextField, Container, Grid, Button, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    flex:{
        display: 'flex',
        justifyContent: 'center'
    }
}))

const FormCategory = (props) => {

    const {category, update, create, success, handleDialogClose, reset, handleUpdate} = props
    const classes = useStyle()

    useEffect(() => {
        return () => {
            if(success){
                handleDialogClose()
                handleUpdate()
                reset()
            }
        }
    }, [success,handleDialogClose,handleUpdate,reset])

    const defaultValue = category ? {
        name: category.name
    } : {
        name: ''
    }

    const {handleSubmit, errors, control} = useForm({
        mode: "all",
        reValidateMode: 'onChange',
        defaultValues: defaultValue
    })

    const onSubmit = (data) => {
        if (category) {
            update(data, category.id)
        } else {
            create(data)
        }

    }

    return (
        <div>
            <Container style={{marginTop: 15, marginBottom: 100}}>
                <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Controller
                                name={"name"}
                                render={(props) =>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        error={!!errors.name && !!errors.name.message}
                                        required
                                        fullWidth
                                        id="name"
                                        label="Nom"
                                        name="name"
                                        onChange={props.onChange}
                                        value={props.value}
                                        inputRef={props.ref}
                                        autoFocus
                                    />
                                }
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Il me faut un nom pour la catégorie'
                                    }
                                }}
                                control={control}
                            >
                            </Controller>

                            {errors.name && (
                                <Typography variant={"subtitle2"} color={"error"}>{errors.name.message}</Typography>
                            )}
                        </Grid>
                        <Grid item className={classes.flex} xs>
                            <div className={classes.wrapper}>
                                <Button type={"submit"} variant={"contained"} color={"primary"}>Envoyer</Button>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const category = state.request.data.find((item) => {
        return item.id === ownProps.categoryId
    })

    return {
        category: category,
        success: state.categories.success,
        error: state.categories.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        update: (data, id) => dispatch(updateCategory(data, id)),
        create: (data) => dispatch(createCategory(data)),
        reset: () => dispatch(resetState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormCategory)

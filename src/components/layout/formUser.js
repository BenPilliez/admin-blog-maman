import React from "react"
import {Avatar, Button, Chip, Container, Dialog, DialogActions, DialogContent, Grid, TextField} from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import {DropzoneArea} from "material-ui-dropzone"
import {converFormToFormData} from "../../helpers/convertFormToFomdata"
import {updateUser} from "../../store/actions/usersActions"
import {Controller, useForm} from "react-hook-form"
import {connect} from "react-redux"
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    flex: {
        display: 'flex',
        justifyContent: 'center'
    }
}))

const FormUser = (props) => {

    const options = ['ROLES_USERS', 'ROLES_ALL_ADMIN']
    const {user, update} = props
    const fixedOptions = ["ROLES_USERS"]
    const classes = useStyle()

    const defaultValue = user ? {email: user.email, avatar: user.avatar, ROLES: user.ROLES} : {
        email: '',
        avatar: '',
        ROLES: [...fixedOptions, options[0]]
    }

    const [open, setOpen] = React.useState(false)
    const [files, setFiles] = React.useState(user.avatar || '')

    const {handleSubmit, errors, control} = useForm({
        mode: "all",
        reValidateMode: 'onChange',
        defaultValues: defaultValue
    })

    const onSubmit = (data) => {
        data.avatar = files
        const formData = converFormToFormData(data)
        update(formData, user.id)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Container style={{marginTop: 15, marginBottom: 100}}>
            <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))}>
                <Grid container spacing={4}>
                    <Grid item xs={12} className={classes.flex}>
                        <Button size={"large"} onClick={handleOpen}>
                            <Avatar alt={"user avatar"} style={{height: "100px", width: "100px"}}
                                    src={`${process.env.REACT_APP_BASE_PUBLIC_URL}/${files}`}/>
                        </Button>
                    </Grid>
                    <Grid item xs={12} lg={12} md={12}>
                        <Controller
                            render={(props) => (
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    error={!!errors.email && !!errors.email.message}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    onChange={props.onChange}
                                    value={props.value}
                                    inputRef={props.ref}
                                    autoFocus
                                />
                            )}
                            name="email"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Sans email c'est compliqué"
                                }, pattern: {
                                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "C'est un email ça ?"
                                }
                            }}
                        />

                        {errors.email && (
                            <div className="error">{errors.email.message}</div>
                        )}

                    </Grid>
                    <Grid item xs={12} lg={12} md={12}>
                        <Controller
                            render={({onChange, ...props}) => (
                                <Autocomplete
                                    multiple
                                    id="roles"
                                    variant="outlined"
                                    style={{
                                        marginTop: '16px',
                                        marginBottom: '8px'
                                    }}
                                    fullWidth
                                    value={props.value}
                                    onChange={(event, newValue) => {
                                        const value = [...fixedOptions, ...newValue.filter((option) => fixedOptions.indexOf(option) === -1)]
                                        onChange(value)
                                    }}
                                    options={options}
                                    getOptionLabel={(option) => option}
                                    renderTags={(tagValue, getTagProps) =>
                                        tagValue.map((option, index) => (
                                            <Chip
                                                label={option}
                                                {...getTagProps({index})}
                                                disabled={fixedOptions.indexOf(option) !== -1}
                                            />
                                        ))
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} label="Roles" variant="outlined" placeholder="Roles"/>
                                    )}
                                />
                            )}
                            name="ROLES"
                            onChange={([, data]) => data}
                            control={control}
                        />
                    </Grid>
                    <Dialog open={open}
                            fullWidth={true}
                            onClose={handleClose}>
                        <DialogContent>
                            <Controller
                                render={(props) => {
                                    return <DropzoneArea
                                        dropzoneText={"Dépose ton avatar ou clique"}
                                        acceptedFiles={['image/*']}
                                        onChange={(files) => {
                                            console.log(files);
                                            setFiles(files)
                                        }}
                                        filesLimit={1}
                                        maxFileSize={2000000}/>
                                }}
                                name={"avatar"}
                                control={control}/>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Annuler
                            </Button>
                            <Button onClick={handleClose} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Grid item className={classes.flex} xs>
                        <Button type={"submit"} variant={"contained"} color={"primary"}>Envoyer</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    const user = state.request.data.find((item) => {
        return item.id === ownProps.userId
    })
    return {
        user: user,
        updateSuccess: state.users.success,
        error: state.users.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        update: (data, params) => dispatch(updateUser(data, params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormUser)

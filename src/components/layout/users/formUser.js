import React, {useEffect} from "react"
import {Avatar, Button, Chip, Container, Grid, IconButton, InputAdornment, TextField} from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import {DropzoneArea} from "material-ui-dropzone"
import CustomDialog from "../../custom/customDialog"
import {converFormToFormData} from "../../../helpers/convertFormToFomdata"
import {createUser, resetState, updateUser} from "../../../store/actions/usersActions"
import {Controller, useForm} from "react-hook-form"
import {connect} from "react-redux"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {makeStyles} from "@material-ui/core/styles"
import {green} from "@material-ui/core/colors";


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
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12
    }
}))

const FormUser = (props) => {

    const options = ['ROLES_USERS', 'ROLES_ALL_ADMIN']
    const {user, update, create, success, handleDialogClose, reset, handleUpdate} = props
    const fixedOptions = user ? ["ROLES_USERS"] : ['ROLES_ALL_ADMIN', 'ROLES_USERS']
    const classes = useStyle()
    const [open, setOpen] = React.useState(false)
    const [files, setFiles] = React.useState(user ? user.avatar : '')
    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

    useEffect(() => {
        return () => {
            if(success){
                handleDialogClose()
                handleUpdate()
                reset()
            }
        }
    }, [success,handleDialogClose,handleUpdate,reset])

    const defaultValue = user ? {
        email: user.email,
        avatar: user.avatar,
        ROLES: user.ROLES,
        password: '',
        confirmPassword: '',
        deleteAvatar: false
    } : {
        email: '',
        avatar: '',
        password: '',
        confirmPassword: '',
        deleteAvatar: false,
        ROLES: [options[0], options[1]]
    }

    const {handleSubmit, errors, control, getValues} = useForm({
        mode: "all",
        reValidateMode: 'onChange',
        defaultValues: defaultValue
    })

    const onSubmit = (data) => {
        data.avatar = files
        const formData = converFormToFormData(data)
        if (user) {
            update(formData, user.id)
        } else {
            create(formData)
        }

    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
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
                            {files && typeof files === "string" ?
                                <Avatar alt={"user avatar"} className={classes.image}
                                        src={`${process.env.REACT_APP_BASE_PUBLIC_URL}/${files}`}/> :
                                <Avatar className={classes.image}> AB </Avatar>
                            }
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
                    {!user ? (<> <Grid item xs={12} lg={12} md={12}>
                        <Controller
                            control={control}
                            name="password"
                            rules={
                                {
                                    required: {
                                        value: true,
                                        message: 'Il me faut un mot de passe'
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\?<>\{\}\[\]\(\)\$%\^&\*])(?=.{8,})/,
                                        message: 'Le mot doit contenir au moins une majuscule,faire au moins 8 caractères,un nombre et un caractère spécial'
                                    }
                                }
                            }
                            render={(props) => (
                                <TextField
                                    fullWidth={true}
                                    variant={"outlined"}
                                    label={"Mot de passe"}
                                    id="password"
                                    error={!!errors.password && !!errors.password.message}
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={props.onChange}
                                    value={props.value}
                                    inputRef={props.ref}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Montrer le mot de passe"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleClickShowPassword()
                                                    }}
                                                >
                                                    {showPassword ? <FontAwesomeIcon icon={"eye"}/> :
                                                        <FontAwesomeIcon icon={"eye-slash"}/>}
                                                </IconButton>
                                            </InputAdornment>)
                                    }}
                                />
                            )}
                        >
                        </Controller>

                        {errors.password && (
                            <div className="error">{errors.password.message}</div>
                        )}

                    </Grid>
                        <Grid item xs={12} lg={12} md={12}>
                            <Controller
                                control={control}
                                name="confirmPassword"
                                rules={
                                    {
                                        required: {
                                            value: true,
                                            message: 'Il me faut un mot de passe'
                                        },
                                        validate: value => {
                                            if (value === getValues('password')) {
                                                return true
                                            } else {
                                                return 'Les mots de passe ne correspondent pas'
                                            }
                                        }
                                    }
                                }
                                render={(props) => (
                                    <TextField
                                        fullWidth={true}
                                        variant={"outlined"}
                                        label={"Confirmation mot de passe"}
                                        id="confirmPassword"
                                        error={!!errors.confirmPassword && !!errors.confirmPassword.message}
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        onChange={props.onChange}
                                        value={props.value}
                                        inputRef={props.ref}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="Montrer le mot de passe"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleClickShowConfirmPassword()
                                                        }}
                                                    >
                                                        {showConfirmPassword ? <FontAwesomeIcon icon={"eye"}/> :
                                                            <FontAwesomeIcon icon={"eye-slash"}/>}
                                                    </IconButton>
                                                </InputAdornment>)
                                        }}
                                    />
                                )}
                            >
                            </Controller>

                            {errors.confirmPassword && (
                                <div className="error">{errors.confirmPassword.message}</div>
                            )}
                        </Grid>
                    </>) : null}
                    <CustomDialog isOpen={open} handleClose={handleClose} title={"Avatar"} dialogActions={[{label: 'Annuler'}, {label: 'Ok'}]}>
                        <Controller
                            render={(props) => {
                                return <DropzoneArea
                                    dropzoneText={"Dépose ton avatar ou clique"}
                                    acceptedFiles={['image/*']}
                                    onChange={(files) => {
                                        if (files.length === 0 && user.avatar) {
                                            setFiles(user.avatar)
                                        } else {
                                            setFiles(files)
                                        }
                                    }}
                                    filesLimit={1}
                                    maxFileSize={2000000}/>
                            }}
                            name={"avatar"}
                            control={control}/>
                    </CustomDialog>
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
    const user = state.request.data.find((item) => {
        return item.id === ownProps.userId
    })
    return {
        user: user,
        success: state.users.success,
        error: state.users.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        update: (data, params) => dispatch(updateUser(data, params)),
        create: (data) => dispatch(createUser(data)),
        reset: () => dispatch(resetState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormUser)

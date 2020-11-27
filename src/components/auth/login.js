import React from "react"
import {Avatar, Button, Grid, makeStyles, Paper, TextField, Typography} from "@material-ui/core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import loginImage from "../../images/login.jpg"
import {login} from "../../store/actions/authActions";
import {connect} from "react-redux"
import {Controller, useForm} from "react-hook-form"


const useStyle = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${loginImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const Login = (props) => {
    const classes = useStyle()
    const {Login} = props
    const {handleSubmit, errors, control} = useForm({
        mode: "all",
        reValidateMode: 'onChange',
        defaultValues: {email: '', password: ''}
    })


    const onSubmit = (data) => {
        Login(data)
    }

    return (
        <Grid container component={'main'} className={classes.root}>
            <Grid item xs={false} sm={false} md={5} component={Paper} className={classes.image}/>
            <Grid item xs={12} sm={12} md={7} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <FontAwesomeIcon icon={"lock"}/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Connecte toi !
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit((data) => onSubmit(data))}>
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

                        <Controller
                            render={(props) => (
                                <TextField
                                    variant="outlined"
                                    error={!!errors.password && !!errors.password.message}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Mot de passe"
                                    type="password"
                                    id="password"
                                    onChange={props.onChange}
                                    value={props.value}
                                    inputRef={props.ref}
                                />
                            )}
                            name={"password"}
                            control={control}
                            rules={{
                                required: {
                                    value: true, message: "Sans mot de passe c'est compliqué"
                                }
                            }}
                        />

                        {errors.password && (
                            <div className="error">{errors.password.message}</div>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Se connecter
                        </Button>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        Login: (credentials) => dispatch(login(credentials))
    }
}

export default connect(null, mapDispatchToProps)(Login)

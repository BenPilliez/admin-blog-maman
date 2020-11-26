import React from "react"
import {Avatar, Button, Grid, makeStyles, Paper, TextField, Typography} from "@material-ui/core"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import loginImage from "../../images/login.jpg"
import {login} from "../../store/actions/authActions";
import {connect} from "react-redux"


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
    const [email, setEmail] = React.useState(null)
    const [password, setPassword] = React.useState(null)

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        Login({email, password})
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
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            onChange={handleChangeEmail}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            onChange={handleChangePassword}
                            autoComplete="current-password"
                        />
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

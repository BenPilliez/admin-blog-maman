import React from "react"
import {Button, Container, Grid, TextField} from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import {DropzoneArea} from "material-ui-dropzone"
import {converFormToFormData} from "../../helpers/convertFormToFomdata"
import {Controller, useForm} from "react-hook-form"


const EditUser = (props) => {

    const options = ['ROLES_USERS', 'ROLES_ALL_ADMIN']
    const {handleSubmit, errors, control} = useForm({
        mode: "all",
        reValidateMode: 'onChange',
        defaultValues: {email: '', avatar: '', ROLES: [options[0]]}
    })

    const onSubmit = (data) => {
        const formData = converFormToFormData(data)
    }

    const handleFile = (file) => {

    }



    return (
        <Container style={{marginTop: 15, marginBottom: 100}}>
            <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))}>
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={6} md={6}>
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

                    <Grid item xs={12} lg={6} md={6}>
                        <Controller
                            render={({ onChange, ...props }) => (
                                <Autocomplete
                                    multiple
                                    id="roles"
                                    variant="outlined"
                                    style={{marginTop: '16px',
                                        marginBottom: '8px'}}
                                    fullWidth
                                    value={props.value}
                                    onChange={(event, newValue) => {
                                        onChange(newValue)
                                    }}
                                    options={options}
                                    getOptionLabel={(option) => option}
                                    /*renderTags={(tagValue, getTagProps) =>
                                        tagValue.map((option, index) => (
                                            <Chip
                                                label={option.title}
                                                {...getTagProps({ index })}
                                                disabled={fixedOptions.indexOf(option) !== -1}
                                            />
                                        ))
                                    }*/
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

                    <Grid item xs={12} lg={12} md={12}>
                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            dropzoneText={"Dépose ton avatar ou clique"}
                            onChange={(files) => handleFile(files)}
                            getFileAddedMessage={(files) => {
                                return `L'image ${files} a été ajouté`
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Button type={"submit"} variant={"contained"} color={"primary"}>Envoyer</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


export default EditUser

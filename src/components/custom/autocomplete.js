import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import {Chip} from "@material-ui/core";


const CustomAutocomplete = ({options,value, label, id, optionLabel, optionSelected, variant,fixedOptions,change,multiple}) => {
    const [open, setOpen] = React.useState(false)
    const loading = open && options.length === 0

    React.useEffect(() => {

        if (!loading) {
            return undefined;
        }

    }, [loading]);

    return (
        <Autocomplete
            multiple={multiple}
            id={id}
            open={open}
            value={value}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option,value) => optionSelected(option,value)}
            getOptionLabel={(option) => optionLabel(option)}
            options={options}
            loading={loading}
            onChange={(event, newValue) => {
                return change(newValue)
            }}
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
                <TextField
                    {...params}
                    label={label}
                    variant={variant}
                    placeholder={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    )
}
CustomAutocomplete.defaultProps = {
    multiple: false,
    optionLabel: (option) => option.name ? option.name : '',
    optionSelected: (option, value) => {
      if(value === "" || (option.name === value.name)) return true
    } ,
    variant: "outlined",
    fixedOptions: [],
}

CustomAutocomplete.propTypes = {
    multiple: PropTypes.bool,
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    optionLabel: PropTypes.func,
    optionSelected: PropTypes.func,
    variant: PropTypes.string,
    fixedOptions: PropTypes.array,
}

export default CustomAutocomplete

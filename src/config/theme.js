import {createMuiTheme} from '@material-ui/core/styles';
import {orange, red} from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary:
            {main: orange[900]},
        secondary:{main:red[500]},
        type: 'dark'
    }
})

export default theme

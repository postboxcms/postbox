import makeStyles from '@mui/styles/makeStyles';
import { green, grey } from '@mui/material/colors';

export const comStyles = makeStyles((theme) => ({
    grid: {
        height: 400,
        width: '100%',
        backgroundColor: '#fff'
    },
    cardText: {
        flex: 1,
        fontSize: "14px"
    },
    body: {
        backgroundColor: '#fff'
    },
    icon: {
        float: "right",
        fontSize: 80,
        opacity: 0.5,
        color: "#ddd"
    },
    avatar: {
        color: '#fff',
        backgroundColor: grey[500],
    },
    label: {
        backgroundColor: green[500],
        fontSize: theme.spacing(1.5),
        fontWeight: 500,
        paddingRight: theme.spacing(0.2),
        paddingLeft: theme.spacing(0.2),
        width: theme.spacing(8),
        height: theme.spacing(3)
    },
    button: {
        marginRight: theme.spacing(1)
    },
    largebutton: {
        marginBottom: theme.spacing(1),
        float: 'right'
    },
    header: {
        overflow: 'hidden',
        clear: 'both'
    },
    headerIcon: {
        marginBottom: theme.spacing(0.6),
        fontSize: theme.spacing(3.2)
    },
    title: {
        float: 'left',
        marginBottom: 0,
        fontSize: theme.spacing(3.2),
    }

}));

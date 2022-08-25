import makeStyles from '@mui/styles/makeStyles';
import { green, grey } from '@mui/material/colors';

export const ElementCSS = makeStyles((theme) => ({
    grid: {
        height: 450,
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
    },
    iconClass: {
        float: "right",
        "& .MuiSvgIcon-root": {
            fontSize: 80
        }
    },
    breadcrumb: {
        display: 'inline-block',
        fontSize: theme.spacing(1.8),
        backgroundColor: '#281850',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        borderRadius: theme.spacing(5),
        color: '#fff'
    },
    icon: {
        marginRight: theme.spacing(0.5),
        marginBottom: theme.spacing(0.6),
        width: 20,
        height: 20
    },
    breadcrumbText: {
        fontSize: theme.spacing(1.8),
    }
}));

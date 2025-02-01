import makeStyles from "@mui/styles/makeStyles";

const drawerWidth = 200;

export const useAdminCSS = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer - 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        boxShadow: "none",
        marginBottom: "20px",
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appToolbar: {
        paddingRight: '10px',
        paddingLeft: '66px',
        '& .title': {
            flexGrow: 1
        }
    },
    appToolbarShift: {
        paddingLeft: '10px',
        paddingRight: '10px',
        '& .title': {
            flexGrow: 1
        }
    },
    toolbar: {
        justifyContent: "center",
    },
    menuButton: {
        marginRight: 18,
        color: theme.palette.primary.dark
    },
    menuButtonHidden: {
        display: "none",
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        backgroundColor: theme.palette.navigation.main,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: '60px',
        minWidth: '60px',
        [theme.breakpoints.up("sm")]: {
            width: '60px',
        },
        '& ul a': {
            margin: '10px 5px!important'
        },
        '& ul a > li': {
            padding: '8px 15px!important'
        },
        '& ul > div > li': {
            visibility: 'hidden'
        },
        '& ul a > li > div > span': {
            visibility: 'hidden'
        }
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: 200,
    },
    navbar: {
        "& a": {
            display: "block",
            margin: "10px",
            borderRadius: "5px",
        },
        "& a.active": {
            backgroundColor: theme.palette.navigation.dark,
        },
        "& a.submenu": {
            // marginLeft: '30px',
            marginTop: "0",
        },
    },
}));

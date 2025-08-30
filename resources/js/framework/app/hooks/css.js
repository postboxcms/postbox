import makeStyles from "@mui/styles/makeStyles";
import { green, grey } from "@mui/material/colors";
import { lighten } from "@app/utils/colors";

export const useCSS = makeStyles((theme) => ({
    panel: {
        boxShadow:
            "0px 1px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
    grid: {
        height: "calc(100vh - 200px)",
        width: "100%",
        backgroundColor: "#fff",
    },
    modal: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "left",
        borderRadius: "5px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        backgroundColor: "#fff",
        border: "1px solid #aaa",

        "& h2": {
            width: "100%",
            padding: "5px 10px",
            marginBottom: "10px",
            // borderBottom: "1px solid #ccc",
            clear: "both",
        },

        "& .MuiContainer-root": {
            marginTop: "5px",
        },
    },
    cardText: {
        flex: 1,
    },
    cardIcons: {
        fontSize: "2.5rem",
        color: lighten(theme.palette.primary.main, 85)
    },
    noRowsOverlay: {
        color: lighten(theme.palette.primary.main, 70)
    },
    body: {
        paddingTop: theme.spacing(4),
    },
    avatar: {
        color: "#fff",
        backgroundColor: grey[500],
    },
    label: {
        backgroundColor: green[500],
        fontSize: theme.spacing(1.5),
        fontWeight: 500,
        paddingRight: theme.spacing(0.2),
        paddingLeft: theme.spacing(0.2),
        width: theme.spacing(8),
        height: theme.spacing(3),
    },
    button: {
        marginRight: theme.spacing(1),
    },
    primaryButton: {
        fontWeight: 600,
        "& .MuiButton-iconSizeMedium": {
            "& svg": {
                fontSize: "1rem",
            },
        },
    },
    header: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        "& button": {
            alignSelf: "right",
        }
    },
    heading: {
        marginBottom: "8px",
    },
    headerIcon: {
        marginBottom: theme.spacing(0.6),
        fontSize: theme.spacing(3.2),
    },
    pageTitle: {
        float: "left",
        marginBottom: 0,
        fontSize: theme.spacing(2.8),
    },
    iconClass: {
        float: "right",
        "& .MuiSvgIcon-root": {
            fontSize: 80,
        },
    },
    breadcrumb: {
        display: "inline-block",
        fontSize: theme.spacing(1.8),
        fontWeight: theme.typography.fontWeight,
        backgroundColor: theme.palette.primary.main,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        borderRadius: theme.spacing(5),
        color: "#fff",
        "& .MuiBreadcrumbs-separator": {
            paddingBottom: "2px",
        },
        "& .MuiTypography-root": {
            paddingBottom: "2px",
            fontWeight: theme.typography.fontWeight,
        },
        "& .MuiTypography-root:hover": {
            color: theme.palette.breadcrumb.hover,
        },
    },
    icon: {
        marginRight: theme.spacing(0.5),
        marginBottom: theme.spacing(0.6),
        width: 20,
        height: 20,
    },
    breadcrumbText: {
        textDecoration: "none",
        fontSize: theme.spacing(1.6),
    },
    coaster: {
        borderLeft: "solid 4px",
        borderLeftColor: theme.palette.primary.main,
    },
    draggable: {
        border: "dashed 2px",
        borderColor: theme.palette.element.border,
        padding: "10px",
        "& p": {
            margin: 0,
        },
    },
    component: {
        display: "flex",
        gap: theme.spacing(2),
        marginTop: theme.spacing(1),
        '& .MuiCardContent-root': {
            padding: 0,
            '& h2': {
                padding: theme.spacing(1, 2),
                margin: 0,
                borderBottom: `1px solid ${theme.palette.divider}`,
            },
        }
    },
    leftPanel: {
        flex:7,
    },
    rightPanel: {
        flex: 3,
    },
    tooltip: {
        paddingTop: theme.spacing(1),
        fontSize: theme.spacing(1.6),
    },
    footerLink: {
        color: theme.palette.primary.main
    },
    formInput: {
        width: "100%",
        marginBottom: theme.spacing(2),
        "& fieldset": {
            border: "none",
        },
    },
    radioSwitch: {
        margin: theme.spacing(1, 0, 1, 2),
    },
    addEditWrapper: {
        '& section': {
            border: "none",
            textAlign: "center",
            padding: "2rem"
        }
    }
}));

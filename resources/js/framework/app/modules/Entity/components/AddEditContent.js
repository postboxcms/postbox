import React from "react";
import Panel from "@ui/components/Panel";
import Title from "@ui/elements/Title";
import { useCSS, useSecureRoute } from "@app/hooks";

export const AddEditContent = ({ query, type }) => {
    const classes = useCSS();
    const api = useSecureRoute();
    const [pageTitle, setPageTitle] = React.useState('...');
    const [leftCards, setLeftCards] = React.useState([]);
    const [rightCards, setRightCards] = React.useState([]);

    const processFields = React.useCallback(() => {
        api.get(`/crud/${type}`).then((response) => {
            console.log("Fields response:", response);
            if (response?.data?.fields) {
                response.data.fields.filter((field) => {
                    if (field.position !== 'hidden' && field.position == 'left') {
                        setLeftCards((prevFields) => [...prevFields, field]);
                        return true;
                    }
                    if (field.position !== 'hidden' && field.position == 'right') {
                        setRightCards((prevFields) => [...prevFields, field]);
                        return true;
                    }
                });
            }
            return [];
        }).catch((error) => {
            console.error("Error fetching fields:", error);
            return [];
        });
    }, [api, type]);

    const processTitle = React.useCallback(() => {
        switch (query) {
            case 'add':
                setPageTitle(`New ${type}`);
                break;
            case 'edit':
                setPageTitle(`Edit ${type}`);
                break;
            default:
                setPageTitle(`View ${type}`);
                break;
        }
    }, [query, type]);

    React.useEffect(() => {
        processTitle();
        processFields();
    }, []);

    return (
        <React.Fragment>
            <div className={classes.header}>
                <Title>{pageTitle}</Title>
            </div>
            <div className={classes.component}>
                <div className={classes.leftPanel}>
                    {leftCards.map((card, idx) => (
                        <Panel key={idx}>
                            {/* Render field content here, e.g.: */}
                            {card.field}
                        </Panel>
                    ))}
                </div>
                <div className={classes.rightPanel}>
                    {rightCards.map((card, idx) => (
                        <Panel key={idx}>
                            {/* Render field content here, e.g.: */}
                            {card.field}
                        </Panel>
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}

export default AddEditContent;
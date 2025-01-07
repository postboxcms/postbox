import React from "react";
import Panel from "@ui/components/Panel";
import Title from "@ui/elements/Title";
import { useCSS } from "@app/hooks";

export const AddEditContent = ({ query, type }) => {
    const classes = useCSS();
    const [pageTitle, setPageTitle] = React.useState('...');

    React.useEffect(() => {
        switch (query) {
            case 'add':
                setPageTitle(`Add a ${type.toLowerCase()}`);
                return;
            case 'edit':
                setPageTitle(`Edit ${type.toLowerCase()}`);
                return;
            default:
                setPageTitle('Error rendering the title');
                return;
        }
    }, []);

    return (
        <React.Fragment>
            <div className={classes.header}>
                <Title>{pageTitle}</Title>
            </div>
            <Panel width={'70%'}>
            </Panel>
            <Panel width={'70%'}>
            </Panel>
        </React.Fragment>
    )
}

export default AddEditContent;
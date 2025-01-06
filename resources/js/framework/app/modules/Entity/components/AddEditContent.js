import React from "react";
import Form from "@ui/components/Form";
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
            <Form width={'70%'}>
            </Form>
            <Form width={'70%'}>
            </Form>
        </React.Fragment>
    )
}

export default AddEditContent;
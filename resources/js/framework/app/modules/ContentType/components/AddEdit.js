import React from "react";
import Title from "../../../ui/components/Title";
import Form from "../../../ui/components/Form";

const AddEditContent = ({ query, type }) => {
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
            <Title title={pageTitle}></Title>
            <Form width={'70%'}>
            </Form>
            <Form width={'70%'}>
            </Form>
        </React.Fragment>
    )
}

export default AddEditContent;
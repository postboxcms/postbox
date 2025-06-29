import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import Panel from "@ui/components/Panel";
import FormInput from "@ui/components/FormInput";
import Title from "@ui/elements/Title";
import { useCSS, useSecureRoute, ucfirst, singularize } from "@app/hooks";

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

    const renderField = (field) => {
        // This function should return the appropriate component based on the field type
        switch (field.type) {
            case 'text':
                return <FormInput variant="outlined" fullWidth />;
            case 'number':
                return <FormInput type="number" variant="outlined" fullWidth />;
            case 'date':
                return <FormInput type="date" variant="outlined" fullWidth />;
            case 'select':
                return (
                    <FormInput
                        select
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                            native: true,
                        }}
                    >
                        {field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </FormInput>
                );
            case 'ckeditor':
                // Assuming you have a CKEditor component
                return (
                    <Editor
                        apiKey="t3j8g1sr4fn45538j9zvgsx2rx182gztzud61l8y8inwgt7g"
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount',
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help',
                        }}
                        onEditorChange={(content) => {
                            console.log("Editor content:", content);
                        }}
                    />
                );
            case 'textarea':
                return <FormInput variant="outlined" fullWidth multiline rows={4} />;
            case 'checkbox':
                return (
                    <FormInput
                        type="checkbox"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            inputProps: { 'aria-label': field.label },
                        }}
                    />
                );
            case 'radio':
                return (
                    <FormInput
                        type="radio"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            inputProps: { 'aria-label': field.label },
                        }}
                    />
                );
            case 'file':
                return (
                    <FormInput
                        type="file"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            inputProps: { 'aria-label': field.label },
                        }}
                    />
                );
            case 'image':
                return (
                    <FormInput
                        type="file"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            inputProps: { 'aria-label': field.label, accept: 'image/*' },
                        }}
                    />
                );
            case 'password':
                return <FormInput type="password" variant="outlined" fullWidth />;
            case 'email':
                return <FormInput type="email" variant="outlined" fullWidth />;
            case 'url':
                return <FormInput type="url" variant="outlined" fullWidth />;
            case 'tel':
                return <FormInput type="tel" variant="outlined" fullWidth />;
            case 'color':
                return <FormInput type="color" variant="outlined" fullWidth />;
            case 'hidden':
                return <FormInput type="hidden" variant="outlined" fullWidth />;
            // Add more cases for other field types as needed
            default:
                return <FormInput variant="outlined" fullWidth />;
        }
    };

    React.useEffect(() => {
        processTitle();
        processFields();
    }, []);

    return (
        <React.Fragment>
            <div className={classes.header}>
                <Title>{singularize(pageTitle)}</Title>
            </div>
            <div className={classes.component}>
                <div className={classes.leftPanel}>
                    {leftCards.map((card, idx) => (
                        <Panel key={idx}>
                            {/* Render field content here, e.g.: */}
                            <Title style={{
                                padding: "5px 10px",
                                borderBotton: "",
                                margin: 0,
                            }} variant="normal">{ucfirst(card.field)}</Title>
                            {renderField(card)}
                        </Panel>
                    ))}
                </div>
                <div className={classes.rightPanel}>
                    {rightCards.map((card, idx) => (
                        <Panel key={idx}>
                            {/* Render field content here, e.g.: */}
                            <Title variant="normal">{ucfirst(card.field)}</Title>
                            {renderField(card)}
                        </Panel>
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}

export default AddEditContent;
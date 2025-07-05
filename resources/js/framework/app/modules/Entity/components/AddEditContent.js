import React from "react";
import SaveButton from "@ui/elements/SaveButton";
import Panel from "@ui/components/Panel";
import FormInput from "@ui/elements/FormInput";
import Title from "@ui/elements/Title";
import BoxEditor from "@ui/elements/BoxEditor";
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

    const generatePlaceholder = (element) => {
        // Generate a placeholder based on the field type and name
        if (element.type === 'text' || element.type === 'textarea') {
            return `Provide a ${element.field}`;
        }
        if (element.type === 'number') {
            return `Enter a number for ${element.field}`;
        }
        if (element.type === 'date') {
            return `Select a date for ${element.field}`;
        }
        if (element.type === 'select') {
            return `Select an option for ${element.field}`;
        }
        if (element.type === 'editor') {
            return `Enter content for ${element.field}`;
        }
        if (element.type === 'file' || element.type === 'image') {
            return `Upload a ${element.field}`;
        }
        if (element.type === 'checkbox' || element.type === 'radio') {
            return `Select ${element.field}`;
        }
        if (element.type === 'password') {
            return `Enter your ${element.field}`;
        }
        if (element.type === 'email') {
            return `Enter your ${element.field}`;
        }
        if (element.type === 'url') {
            return `Enter a valid ${element.field}`;
        }
        if (element.type === 'tel') {
            return `Enter your ${element.field}`;
        }
        if (element.type === 'color') {
            return `Select a color for ${element.field}`;
        }
    }

    const renderField = (field) => {
        // This function should return the appropriate component based on the field type
        switch (field.type) {
            case 'text':
                return (
                    <FormInput
                        placeholder={generatePlaceholder(field)}
                        variant="outlined"
                        fullWidth
                    />
                );
            case 'number':
                return (
                    <FormInput
                        placeholder={generatePlaceholder(field)}
                        type="number"
                        variant="outlined"
                        fullWidth
                    />
                );
            case 'date':
                return (
                    <FormInput
                        placeholder={generatePlaceholder(field)}
                        type="date"
                        variant="outlined"
                        fullWidth
                    />
                );
            case 'select':
                return (
                    <FormInput
                        select
                        type="select"
                        placeholder={generatePlaceholder(field)}
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
            case 'editor':
                return (
                    <BoxEditor
                        onEditorChange={(content) => {
                            console.log("Editor content:", content);
                        }}
                    />
                );
            case 'textarea':
                return <FormInput type="textarea" placeholder={generatePlaceholder(field)} variant="outlined" fullWidth multiline rows={5} />;
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
                        InputProps={{
                            inputProps: { 'aria-label': field.label },
                        }}
                        placeholder={field.field}
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
                        type="image"
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
                <SaveButton
                    variant="contained"
                    color="primary"
                    // className={classes.primaryButton}
                    onClick={() => {
                        console.log("Save button clicked");
                        // Handle save logic here
                    }}
                />

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
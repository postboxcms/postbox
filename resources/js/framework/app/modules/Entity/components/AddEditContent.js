import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { first, isEmpty } from 'lodash';

import { useWebCSS, useSecureRoute, useNotifier, useAuth, useTypography } from '@app/hooks';

import { getUser } from '@modules/Auth/reducers/user';
import { loadCRUD } from '@modules/CRUD/reducers/crud';
import { loadEntity, updateEntity, storeEntity } from '@modules/Entity/reducers/entities';

import SaveButton from '@ui/elements/SaveButton';
import Panel from '@ui/components/Panel';
import Form from '@ui/components/Form';
import FormInput from '@ui/elements/FormInput';
import Title from '@ui/elements/Title';
import BoxEditor from '@ui/elements/BoxEditor';

export const AddEditContent = ({ query, type }) => {
  const classes = useWebCSS();
  const api = useSecureRoute();
  const notify = useNotifier();
  const user = useSelector(getUser);
  const crud = useSelector((state) => state.crud.data);
  const status = useSelector((state) => state.crud.status);
  const entity = useSelector((state) => state.entities);
  const dispatch = useDispatch();
  const { token } = useAuth();
  const [icon, setIcon] = React.useState('');
  const [pageTitle, setPageTitle] = React.useState('...');
  const [editorContent, setEditorContent] = React.useState({});
  const [image, setImage] = React.useState([]);
  const [multiline, setMultiline] = React.useState({});
  const [fields, setFields] = React.useState([]);
  const [hiddenFields, setHiddenFields] = React.useState([]);
  const [leftCards, setLeftCards] = React.useState([]);
  const [entityData, setEntityData] = React.useState(entity?.details);
  const [rightCards, setRightCards] = React.useState([]);
  const [error, setError] = React.useState(false);
  const { ucfirst, singularize } = useTypography();

  const generatePlaceholder = React.useCallback(
    (element) => {
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
        return query === 'edit' ? generateFilePath(element) : null;
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
    },
    [entityData]
  );

  const generateFilePath = (element) => {
    const image = generateFieldValue(element.type);
    return image ? `/uploads/${type}/${image}` : null;
  };

  const generateFieldValue = React.useCallback(
    (field) => {
      // Get the value of a field from entityData or return an empty string if not found
      if (entityData && status === 'fulfilled') {
        return entityData[field]?.value;
      }
      return;
    },
    [entityData, status]
  );

  const updateEntityData = (event) => {
    // Update the entityData state with the new value from the input field
    const { name, value, option } = event.target;
    let dynamicValue = value;

    if (!entityData || !entityData[name]) {
      if (option) {
        const currentValue = entityData[name]?.value || '';
        const valuesArray = currentValue ? currentValue.toString().split('|') : [];
        valuesArray.push(option);
        dynamicValue = valuesArray.join('|');
      }
      setEntityData((prevData) => ({
        ...prevData,
        [name]: { value: dynamicValue },
      }));
      return;
    }

    if (option) {
      const currentValue = entityData[name]?.value || '';
      const valuesArray = currentValue ? currentValue.toString().split('|') : [];
      dynamicValue = valuesArray.includes(option)
        ? valuesArray.filter((val) => val !== option).join('|')
        : [...valuesArray, option].join('|');
    }

    setEntityData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        value: dynamicValue,
      },
    }));
    return;
  };

  const renderField = (field) => {
    // This function should return the appropriate component based on the field type
    const generateSelectedOptions = (option) =>
      entityData && entityData[field.field] && entityData[field.field]?.value
        ? entityData[field.field].value.toString().split('|').includes(option.value)
        : false;

    switch (field.type) {
      case 'text':
        return (
          <FormInput
            required={field.mandatory}
            placeholder={generatePlaceholder(field)}
            name={field.field}
            value={generateFieldValue(field.field)}
            onChange={updateEntityData}
            variant="outlined"
            fullWidth
          />
        );
      case 'number':
        return (
          <FormInput
            required={field.mandatory}
            placeholder={generatePlaceholder(field)}
            name={field.field}
            value={generateFieldValue(field.field)}
            onChange={updateEntityData}
            type="number"
            variant="outlined"
            fullWidth
          />
        );
      case 'date':
        return (
          <FormInput
            required={field.mandatory}
            placeholder={generatePlaceholder(field)}
            value={generateFieldValue(field.field)}
            onChange={updateEntityData}
            name={field.field}
            type="date"
            variant="outlined"
            fullWidth
          />
        );
      case 'dropdown':
        return (
          <FormInput
            required={field.mandatory}
            type="dropdown"
            name={field.field}
            placeholder={generatePlaceholder(field)}
            value={generateFieldValue(field.field)}
            defaultValue={generateFieldValue(field.field)}
            onChange={updateEntityData}
            variant="outlined"
            fullWidth
            inputProps={field}
          />
        );
      case 'editor':
        return (
          <BoxEditor
            name={field.field}
            value={generateFieldValue(field.field)}
            // onChange={updateEntityData}
            onEditorChange={(content) => {
              console.log('Editor content:', content);
              if (query == 'add') {
                setEditorContent({
                  ...editorContent,
                  [field.field]: content,
                });
              }
              if (query == 'edit') {
                updateEntityData({
                  target: {
                    name: field.field,
                    value: content,
                  },
                });
              }
            }}
          />
        );
      case 'textarea':
        return (
          <FormInput
            name={field.field}
            type="textarea"
            value={generateFieldValue(field.field)}
            onChange={updateEntityData}
            placeholder={generatePlaceholder(field)}
            variant="outlined"
            fullWidth
            multiline
            rows={5}
          />
        );
      case 'checkbox':
        return field.options.map((option, idx) => (
          <FormInput
            type="checkbox"
            variant="outlined"
            checked={generateSelectedOptions(option)}
            key={idx}
            name={`${field.field}[]`}
            label={option.value}
            value={generateFieldValue(field.field)}
            onChange={(event) => {
              const isChecked = event.target.checked;
              updateEntityData({
                target: {
                  name: field.field,
                  option: option.value,
                  value: isChecked ? 1 : 0, // Convert checkbox value to '1' or '0'
                },
              });
            }}
            fullWidth
            inputProps={{
              'aria-label': option.value,
            }}
          />
        ));
      case 'radio':
        return field.options.map((option) => (
          <FormInput
            key={option.value}
            type="radio"
            variant="outlined"
            checked={generateSelectedOptions(option)}
            name={field.field}
            label={option.value}
            value={option.value}
            onChange={(event) => {
              if (event.target.checked) {
                updateEntityData({
                  target: {
                    name: field.field,
                    value: option.value,
                  },
                });
              }
            }}
            fullWidth
            inputProps={{ 'aria-label': option.value }}
          />
        ));
      case 'switch':
        return (
          <FormInput
            type="switch"
            name={field.field}
            variant="outlined"
            value={generateFieldValue(field.field)}
            onChange={(event) => {
              const isChecked = event.target.checked;
              updateEntityData({
                target: {
                  name: field.field,
                  value: isChecked ? 1 : 0, // Convert radio value to '1' or '0'
                },
              });
            }}
            fullWidth
            InputProps={{
              inputProps: { 'aria-label': field.label },
            }}
            placeholder={field.alias || field.field}
          />
        );
      case 'file':
        return (
          <FormInput
            type="file"
            name={field.field}
            value={generateFieldValue(field.field)}
            onChange={(event) => {
              const file = event.target.files[0];
              if (file) {
                updateEntityData({
                  target: {
                    name: field.field,
                    value: file.name, // Show the file name as placeholder
                  },
                });
              }
            }}
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
            name={field.field}
            value={generateFieldValue(field.field)}
            variant="outlined"
            fullWidth
            inputProps={{
              inputProps: {
                'aria-label': field.field,
                accept: 'image/*',
              },
            }}
            placeholder={generatePlaceholder(field)}
            onChange={(file) => {
              if (file) {
                // Show the file name as placeholder
                setImage([...image, file.name]);
              }
            }}
          />
        );
      case 'password':
        return <FormInput name={field.field} type="password" variant="outlined" fullWidth />;
      case 'email':
        return <FormInput name={field.field} type="email" variant="outlined" fullWidth />;
      case 'url':
        return <FormInput name={field.field} type="url" variant="outlined" fullWidth />;
      case 'tel':
        return <FormInput name={field.field} type="tel" variant="outlined" fullWidth />;
      case 'color':
        return <FormInput name={field.field} type="color" variant="outlined" fullWidth />;
      case 'hidden':
        return <FormInput name={field.field} type="hidden" variant="outlined" fullWidth />;
      // Add more cases for other field types as needed
      default:
        return <FormInput name={field.field} variant="outlined" fullWidth />;
    }
  };

  const processBlankEntries = (entry) => {
    switch (entry.type) {
      case 'switch':
        return 0;
      case 'editor':
        return entityData?.[entry?.field]?.value;
      default:
        return '';
    }
  };

  const processFormData = (e) => {
    const formData = new FormData(e.target);
    // Append hidden fields to formData
    for (const field of hiddenFields) {
      formData.append(field.field, field.value || '');
    }
    // You can also process the form data here if needed
    // Process form data here, e.g., send it to the server
    for (let [key, value] of formData.entries()) {
      const leftField = leftCards.find((f) => f.field === key || f.field + '[]' === key);
      const rightField = rightCards.find((f) => f.field === key || f.field + '[]' === key);
      const field = leftField || rightField;

      console.log(`Processing field: ${key}, value: ${value}, type: ${field?.type}`);

      if (field && field.mandatory && !(value || '').toString().trim()) {
        setError(true);
        return;
      }

      if (field && field.type === 'textarea') {
        formData.set(key, multiline[key] || String(value));
      }

      if (field && (field.type === 'file' || field.type === 'image')) {
        const fileInput = e.target.querySelector(`input[name="${key}"]`);
        if (fileInput && fileInput.files.length > 0) {
          formData.set(key, fileInput.files[0]); // Set the first file selected
        }
      }

      if (field && field.type === 'switch') {
        formData.set(key, value ? '1' : '0'); // Convert checkbox value to 1 or 0
      }

      if (field && field.type === 'checkbox') {
        const checkboxInputs = e.target.querySelectorAll(`input[name="${key}"]:checked`);
        console.log('Radio input:', checkboxInputs, 'key', key);
        const checkboxValues = Array.from(checkboxInputs)
          .map((input) => input.getAttribute('aria-label'))
          .join('|'); // Get values of all checked checkboxes
        formData.set(key, checkboxValues); // Join multiple values with a comma
      }

      if (field && field.type === 'radio') {
        const radioInput = e.target.querySelector(`input[name="${key}"]:checked`);
        console.log('Radio input:', radioInput, 'key', key);
        const radioValue = radioInput ? radioInput.getAttribute('aria-label') : '';
        if (radioInput) {
          formData.set(key, radioValue); // Set the value of the checked radio button
        } else {
          formData.set(key, ''); // Set empty if no radio is checked
        }
      }

      if (field && field.type === 'switch') {
        const radioInput = e.target.querySelector(`input[name="${key}"]:checked`);
        const radioValue = radioInput && radioInput.value == 'on' ? true : false;
        if (radioInput) {
          formData.set(key, Number(radioValue)); // Set the value of the checked radio button
        } else {
          formData.set(key, ''); // Set empty if no radio is checked
        }
      }

      if (field && field.type === 'editor') {
        formData.set(key, editorContent[key] || '');
      }

      if (field && field.type === 'user') {
        if (user) {
          formData.set(key, user.id); // Assuming user ID is stored as a string
        } else {
          formData.delete(key); // Remove if no user ID is selected
        }
      }
    }

    // Add editor content to formData
    for (const [key, value] of Object.entries(editorContent)) {
      formData.set(key, value);
    }

    // Add code for missed entries
    for (const [key, value] of Object.entries(leftCards.concat(rightCards))) {
      if (isEmpty(formData.get(value.field))) {
        if (value.type !== 'checkbox') {
          formData.set(value.field, processBlankEntries(value));
        }
        if (value.type === 'checkbox') {
          formData.set(value.field, formData.getAll(value.field + '[]'));
          formData.delete(value.field + '[]');
        }
        if (value.type === 'editor') {
          formData.set(
            value.field,
            formData.get(value.field).toString() !== 'undefined' ? formData.get(value.field) : ''
          );
        }
      }
    }

    formData.append('module', type);
    return formData;
  };

  const processFields = React.useCallback(() => {
    dispatch(loadCRUD({ path: type, token: token }));
    console.log('Fields response:', crud);
    if (crud?.fields && status === 'fulfilled') {
      setEntityData(first(crud?.entity?.data || []));
      crud.fields.filter((field) => {
        if (field.position !== 'hidden' && field.position == 'left') {
          setLeftCards((prevFields) => [...prevFields, field]);
          return true;
        }
        if (field.position !== 'hidden' && field.position == 'right') {
          setRightCards((prevFields) => [...prevFields, field]);
          return true;
        }
        if (field.type === 'hidden' || field.type === 'user') {
          if (field.type === 'user' && user) {
            field = {
              ...field,
              value: user.id,
            };
          }
          setHiddenFields((prevFields) => [...prevFields, field]);
          return false;
        }
      });
      setIcon(crud?.icon || '');
    }
    return [];
  }, [api, type, crud]);

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

  const processEntity = React.useCallback(() => {
    if (query === 'edit') {
      console.log('query:', query);
      const entityId = new URLSearchParams(window.location.search).get('eid');
      try {
        dispatch(loadEntity({ path: type, token: token, eid: entityId }));
        const response = { data: entity?.details };
        const eid = entityId;
        console.log('Entity response:', response);
        if (response?.data) {
          // Populate fields with entity data
          console.log('Entity data:', response.data);
          setEntityData(response.data?.entity?.data.find((e) => e.uuid.value == eid) || {});
          // notify("Entity data fetched successfully", "message");
        }
      } catch (error) {
        console.error('Error fetching entity data:', error);
        notify('Error fetching entity data', 'error');
      }
    }
  }, [entity, api, query, type, leftCards, rightCards, notify]);

  const saveContent = () => {
    return (e) => {
      e.preventDefault();
      const formData = processFormData(e);
      formData.append('token', token);
      if (error || !formData) {
        notify('Please fill all mandatory fields', 'error');
        setError(false);
        return;
      }

      if (query === 'edit') {
        const entityId = new URLSearchParams(window.location.search).get('eid');
        formData.append('eid', entityId);
        formData.append('endpoint', `entity/${type}`);
        formData.append('_method', 'put');
        dispatch(updateEntity(formData));
      } else {
        formData.append('endpoint', 'entity');
        dispatch(storeEntity(formData));
      }
    };
  };

  React.useEffect(() => {
    processTitle();
    processFields();
    processEntity();
  }, []);

  return (
    <React.Fragment>
      <div className={classes.addEditWrapper}>
        <Form method="post" onSubmit={saveContent()}>
          <div className={classes.header}>
            <Title icon={icon}>{singularize(pageTitle)}</Title>
            <SaveButton />
          </div>
          <div className={classes.component}>
            <div className={classes.leftPanel}>
              {leftCards.map((card, idx) => (
                <Panel key={idx}>
                  {/* Render field content here, e.g.: */}
                  <Title
                    style={{
                      padding: '5px 10px',
                      borderBotton: '',
                      margin: 0,
                      fontSize: '1rem',
                    }}
                    variant="normal"
                  >
                    {ucfirst(card.alias || card.field)}
                  </Title>
                  {renderField(card)}
                </Panel>
              ))}
            </div>
            <div className={classes.rightPanel}>
              {rightCards.map((card, idx) => (
                <Panel key={idx}>
                  {/* Render field content here, e.g.: */}
                  <Title
                    style={{
                      padding: '5px 10px',
                      borderBotton: '',
                      margin: 0,
                      fontSize: '1rem',
                    }}
                    variant="normal"
                  >
                    {ucfirst(card.alias || card.field)}
                  </Title>
                  {renderField(card)}
                </Panel>
              ))}
            </div>
          </div>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default AddEditContent;

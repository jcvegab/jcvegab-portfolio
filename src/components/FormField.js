import React from 'react';
import _ from 'lodash';

/**
 * @typedef {"checkbox"|"select"|"textarea"|"default"} FormFieldInputType
 */

/**
 * @typedef {Object} FormFieldI
 * @property {FormFieldInputType} input_type - The type of the form field.
 * @property {string} name - The name of the form field.
 * @property {string} [default_value] - The default value or placeholder for the form field.
 * @property {string[]} [options] - The options for select input type.
 * @property {boolean} [is_required] - Whether the form field is required.
 * @property {string} [label] - The label for the form field.
 */

/**
 * @typedef {Object} FormFieldProps
 * @property {FormFieldI} field - The form field configuration.
 */

/**
 * @param {FormFieldProps} props
 * @returns {JSX.Element}
 */
export default function FormField({ field }) {
  const {
    input_type: inputType = 'default',
    name,
    default_value: defaultValue,
    options = [],
    is_required: required,
    label,
  } = field;

  const labelId = `${name}-label`;
  const attr = {};
  if (label) {
    attr['aria-labelledby'] = labelId;
  }
  if (required) {
    attr.required = true;
  }

  switch (inputType) {
    case 'checkbox':
      return (
        <div className="form-group form-checkbox">
          <input type="checkbox" id={name} name={name} {...attr} />
          {label && <label htmlFor={name}>{label}</label>}
        </div>
      );
    case 'select':
      return (
        <div className="form-group">
          {label && <label htmlFor={name}>{label}</label>}
          <div className="form-select-wrap">
            <select id={name} name={name} {...attr}>
              {defaultValue && <option value="">{defaultValue}</option>}
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    case 'textarea':
      return (
        <div className="form-group">
          {label && <label htmlFor={name}>{label}</label>}
          <textarea
            name={name}
            id={name}
            rows="5"
            {...(defaultValue ? { placeholder: defaultValue } : null)}
            {...attr}
          />
          <span className="animate-border" aria-hidden="true" />
        </div>
      );
    default:
      return (
        <div className="form-group">
          {label && <label htmlFor={name}>{label}</label>}
          <input
            type={inputType}
            name={name}
            id={name}
            {...(defaultValue ? { placeholder: defaultValue } : null)}
            {...attr}
          />
          <span className="animate-border" aria-hidden="true" />
        </div>
      );
  }
}

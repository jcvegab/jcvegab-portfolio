import React from 'react';

import { htmlToReact, markdownify } from '../utils';
import FormField from './FormField';

/**
 * @typedef {Object} SectionI
 * @property {string} section_id - Section ID
 * @property {string} title - Section title
 * @property {string} subtitle - Section subtitle
 * @property {string} content - Section content (Markdown)
 * @property {string} form_id - Form ID
 * @property {string} form_action - Form action URL
 * @property {FormField[]} form_fields - Form fields configuration
 * @property {string} submit_label - Submit button label
 */

/**
 * @typedef {Object} SectionFormProps
 * @property {SectionI} section - Section data
 */

/**
 * @param {SectionFormProps} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
export default function SectionForm(props) {
  const { section } = props;

  const {
    section_id: sectionId,
    title,
    subtitle,
    content,
    form_id: formId,
    form_action: formAction,
    form_fields: formFields = [],
    submit_label: submitLabel,
  } = section;

  const formHoneypotInputId = formId + '-honeypot';
  const formHoneypotLabelId = formId + '-honeypot-label';
  const formHoneypotName = formId + '-bot-field';

  return (
    <section id={sectionId} className="block block-form outer">
      <div className="inner">
        {(title || subtitle) && (
          <div className="block-header inner-sm">
            {title && <h2 className="block-title line-top">{title}</h2>}
            {subtitle && (
              <p className="block-subtitle">{htmlToReact(subtitle)}</p>
            )}
          </div>
        )}
        <div className="block-content inner-sm">
          {content && markdownify(content)}
          <form
            name={formId}
            id={formId}
            {...(formAction ? { action: formAction } : null)}
            method="POST"
            data-netlify="true"
            data-netlify-honeypot={formHoneypotName}
          >
            <div className="screen-reader-text">
              <label id={formHoneypotLabelId} htmlFor={formHoneypotInputId}>
                Don't fill this out if you're human:
                <input
                  aria-labelledby={formHoneypotLabelId}
                  id={formHoneypotInputId}
                  name={formHoneypotName}
                />
              </label>
            </div>
            <input type="hidden" name="form-name" value={formId} />
            {formFields.map((field, index) => (
              <FormField key={index} {...props} field={field} />
            ))}
            <div className="form-submit">
              <button type="submit" className="button">
                {submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import FormField from '../FormField';

describe('FormField', () => {
  it('renders a text input', () => {
    const { container } = render(
      <FormField field={{ input_type: 'text', name: 'name', label: 'Name' }} />,
    );
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', 'name');
  });

  it('renders a checkbox', () => {
    const { container } = render(
      <FormField
        field={{ input_type: 'checkbox', name: 'agree', label: 'Agree' }}
      />,
    );
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('renders a select with options', () => {
    render(
      <FormField
        field={{
          input_type: 'select',
          name: 'country',
          label: 'Country',
          options: ['Peru', 'Chile', 'Argentina'],
        }}
      />,
    );
    expect(screen.getByText('Peru')).toBeInTheDocument();
    expect(screen.getByText('Chile')).toBeInTheDocument();
    expect(screen.getByText('Argentina')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders a select with default value', () => {
    render(
      <FormField
        field={{
          input_type: 'select',
          name: 'country',
          default_value: 'Select...',
          options: ['Peru', 'Chile'],
        }}
      />,
    );
    expect(screen.getByText('Select...')).toBeInTheDocument();
  });

  it('renders a textarea', () => {
    const { container } = render(
      <FormField
        field={{ input_type: 'textarea', name: 'message', label: 'Message' }}
      />,
    );
    const textarea = container.querySelector('textarea');
    expect(textarea).toBeInTheDocument();
  });

  it('renders required attribute when is_required is true', () => {
    const { container } = render(
      <FormField
        field={{
          name: 'email',
          label: 'Email',
          is_required: true,
        }}
      />,
    );
    expect(container.querySelector('input')).toBeRequired();
  });

  it('renders placeholder from default_value', () => {
    const { container } = render(
      <FormField
        field={{
          name: 'name',
          label: 'Name',
          default_value: 'Enter your name',
        }}
      />,
    );
    expect(container.querySelector('input')).toHaveAttribute(
      'placeholder',
      'Enter your name',
    );
  });
});

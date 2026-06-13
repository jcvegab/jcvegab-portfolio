import { render, screen } from '@testing-library/react';

import SectionForm from '../SectionForm';

vi.mock('@/utils', () => ({
  htmlToReact: (html: string) => html,
  markdownify: (md: string) => md,
}));

vi.mock('../FormField', () => ({
  default: ({ field }: Record<string, any>) => (
    <div data-testid="form-field">{field.name}</div>
  ),
}));

describe('SectionForm', () => {
  const baseSection = {
    section_id: 'form-1',
    title: 'Contact',
    subtitle: 'Get in touch',
    content: 'Send me a message',
    form_id: 'contact-form',
    form_action: '/thanks',
    form_fields: [
      { input_type: 'text' as const, name: 'name', label: 'Name' },
      { input_type: 'email' as const, name: 'email', label: 'Email' },
    ],
    submit_label: 'Send',
  };

  it('renders the section with title and subtitle', () => {
    render(<SectionForm section={baseSection} />);
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Get in touch')).toBeInTheDocument();
  });

  it('renders the form with action', () => {
    render(<SectionForm section={baseSection} />);
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  it('renders form fields', () => {
    render(<SectionForm section={baseSection} />);
    const fields = screen.getAllByTestId('form-field');
    expect(fields).toHaveLength(2);
  });

  it('renders the submit button', () => {
    render(<SectionForm section={baseSection} />);
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  it('renders content as markdown', () => {
    render(<SectionForm section={baseSection} />);
    expect(screen.getByText('Send me a message')).toBeInTheDocument();
  });

  it('renders without form_action', () => {
    const { container } = render(
      <SectionForm section={{ ...baseSection, form_action: '' }} />,
    );
    const form = container.querySelector('form');
    expect(form).not.toHaveAttribute('action');
  });
});

import { render, screen } from '@testing-library/react';

import ExperienceTimeline from '../ExperienceTimeline';

vi.mock('@/utils', () => ({
  markdownify: (value: string) => value,
}));

describe('ExperienceTimeline', () => {
  const experiences = [
    {
      id: 'lapzo',
      company: 'Lapzo',
      company_url: 'https://www.linkedin.com/company/lapzomx',
      role: 'Full Stack Developer',
      location: 'Remoto',
      summary: 'Desarrollo productos con IA.',
      periods: [
        {
          start: '2025-05',
          start_label: 'Mayo de 2025',
          end_label: 'Presente',
        },
        {
          start: '2021-09',
          start_label: 'Septiembre de 2021',
          end: '2024-05',
          end_label: 'Mayo de 2024',
        },
      ],
      highlights: ['Creé cuatro agentes de IA'],
      technologies: ['React', 'FastAPI'],
    },
    {
      id: 'inetum',
      company: 'Inetum',
      company_url: 'https://www.linkedin.com/company/inetum',
      role: 'Full Stack Developer',
      location: 'Lima',
      summary: 'Construí herramientas para equipos.',
      periods: [
        {
          start: '2024-05',
          start_label: 'Mayo de 2024',
          end: '2025-05',
          end_label: 'Mayo de 2025',
        },
      ],
      highlights: ['Automaticé proyectos'],
      technologies: ['NestJS', 'Azure'],
    },
  ];

  it('renders the experiences as a labelled list with semantic dates', () => {
    const { container } = render(
      <ExperienceTimeline experiences={experiences} />,
    );
    const region = screen.getByRole('region', {
      name: 'Experiencia profesional',
    });
    expect(region.querySelector('ol')).toBeInTheDocument();
    expect(region.querySelectorAll('ol > li')).toHaveLength(2);
    expect(
      screen.getAllByRole('heading', { name: 'Full Stack Developer' }),
    ).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'Lapzo' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/lapzomx',
    );
    expect(screen.getByRole('link', { name: 'Lapzo' })).toHaveAttribute(
      'target',
      '_blank',
    );
    expect(screen.getByRole('link', { name: 'Lapzo' })).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    );
    expect(screen.getByRole('link', { name: 'Inetum' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/inetum',
    );
    expect(screen.getByRole('link', { name: 'Inetum' })).toHaveAttribute(
      'target',
      '_blank',
    );
    expect(screen.getByText('Creé cuatro agentes de IA')).toBeInTheDocument();
    expect(region.querySelectorAll('details')).toHaveLength(2);
    expect(screen.getAllByText('Ver logros destacados')).toHaveLength(2);
    expect(
      screen.getByText('Desarrollo productos con IA.'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('list', { name: 'Tecnologías utilizadas en Lapzo' }),
    ).toHaveTextContent('ReactFastAPI');
    expect(region.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(4);
    expect(
      container.querySelector('time[datetime="2025-05"]'),
    ).toHaveTextContent('Mayo de 2025');
    expect(
      container.querySelector('time[datetime="2024-05"]'),
    ).toBeInTheDocument();
  });

  it('renders nothing when there is no experience', () => {
    const { container } = render(<ExperienceTimeline experiences={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});

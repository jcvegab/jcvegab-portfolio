export type SectionTestimonialItem = {
  content?: string;
  avatar?: string;
  avatar_alt?: string;
  author?: string;
};

export type SectionTestimonialsData = {
  section_id: string;
  title?: string;
  subtitle?: string;
  testimonials?: SectionTestimonialItem[];
  col_number?: 'two' | 'three';
};

export type SectionTestimonialsProps = {
  section: SectionTestimonialsData;
};

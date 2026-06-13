export type TestimonialItem = {
  content?: string;
  avatar?: string;
  avatar_alt?: string;
  author?: string;
};

export type SectionTestimonialsColumnNumber = 'two' | 'three';

export type SectionTestimonialsItem = {
  section_id: string;
  title?: string;
  subtitle?: string;
  testimonials?: TestimonialItem[];
  col_number?: SectionTestimonialsColumnNumber;
};

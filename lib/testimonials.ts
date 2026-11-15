export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  org: string;
  url?: string;
};

// Real, approved quotes only. The section renders nothing while this is
// empty — never add placeholder or invented entries.
export const testimonials: Testimonial[] = [];

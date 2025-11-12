
import { HeadshotStyle } from './types';

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  {
    id: 'corporate-black',
    name: 'Corporate Black',
    prompt: 'Generate a professional corporate headshot of this person with a clean, sharp focus and a solid black backdrop. The person should be wearing business attire. The lighting should be soft and even, creating a classic, professional look.',
    imageUrl: 'https://picsum.photos/seed/black/300/200',
  },
  {
    id: 'tech-office',
    name: 'Modern Tech Office',
    prompt: 'Generate a professional headshot of this person in a modern tech office setting. The background should be slightly blurred (bokeh effect) showing a bright, contemporary office with glass walls and some greenery. The person should have a friendly but confident expression.',
    imageUrl: 'https://picsum.photos/seed/tech/300/200',
  },
  {
    id: 'outdoor-natural',
    name: 'Outdoor Natural',
    prompt: 'Generate a professional headshot of this person outdoors with natural lighting. The background should be a pleasant, out-of-focus park or urban green space. The lighting should look like it\'s from a slightly overcast day to avoid harsh shadows.',
    imageUrl: 'https://picsum.photos/seed/outdoor/300/200',
  },
    {
    id: 'studio-bw',
    name: 'Studio Black & White',
    prompt: 'Generate a dramatic and professional black and white studio headshot of this person. Use strong, high-contrast lighting (like Rembrandt lighting) against a dark, solid backdrop. The final image should be monochrome.',
    imageUrl: 'https://picsum.photos/seed/bw/300/200',
  },
];

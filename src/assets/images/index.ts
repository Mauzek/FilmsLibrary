import logo from './logo.png';
import noPoster from './no_poster.png';

export const images = {
    logo,
    noPoster,
} as const;

export type Images = typeof images;
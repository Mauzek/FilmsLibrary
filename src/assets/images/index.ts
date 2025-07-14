import logo from './logo.png';
import noPoster from './no_poster.png';
import gitHub from './github.svg';
import telegram from './telegram.svg';

export const images = {
    logo,
    noPoster,
    gitHub,
    telegram
} as const;

export type Images = typeof images;
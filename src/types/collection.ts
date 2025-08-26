import listsData from '@data/lists.json';

export interface Collection {
    category: typeof listsData.categories[number];
    name: string;
    slug: string;
    moviesCount: number;
    cover: Cover
}

interface Cover {
    url: string;
    previewUrl: string;
}


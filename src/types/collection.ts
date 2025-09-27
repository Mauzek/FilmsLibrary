import listsData from '@data/lists.json';

export interface Collection {
    category: CategoryKey;
    name: string;
    slug: string;
    moviesCount: number;
    cover: Cover
}

type CategoryKey = keyof typeof listsData.categories;

interface Cover {
    url: string;
    previewUrl: string;
}


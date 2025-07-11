export interface PersonDetails {
  id: number;
  name?: string;
  enName?: string;
  photo?: string;
  sex?: "male" | "female";
  growth?: number;
  birthday?: string;
  death?: string;
  age?: number;
  birthPlace?: BirthPlace[];
  deathPlace?: BirthPlace[];
  profession?: Profession[];
  facts?: Fact[];
  movies?: MovieInPerson[];
}

export interface BirthPlace {
  value: string;
}

export interface Profession {
  value: string;
}

export interface Fact {
  value: string;
  type?: string;
  spoiler?: boolean;
}

export interface MovieInPerson {
  id: number;
  name?: string;
  alternativeName?: string;
  rating?: number;
  general?: boolean;
  description?: string;
  enProfession?: string;
}

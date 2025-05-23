export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_id: [number];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    name?: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface MovieType {
    type:
        | "Bloopers"
        | "Featurette"
        | "Behind the Scenes"
        | "Clip"
        | "Trailer"
        | "Teaser";
}

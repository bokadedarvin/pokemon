export interface PokemonResultList {
    name: string; 
    url: string; 
    infoData: any;
}
export interface PokemonList {
    count: number;
    next: string;
    previous: string;
    results: Array <PokemonResultList>
}

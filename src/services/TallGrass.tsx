const pokedexIdMax = 151;

export class TallGrassService {
    public static stepIntoGrass(url: string): number {
        return this.encounter(url);
    }

    private static encounter(url: string): number {
        var hash = 0;
        for (var i = 0; i < url.length; i++) {
            hash += url.charCodeAt(i);
        }
        return hash % pokedexIdMax;
    }
}
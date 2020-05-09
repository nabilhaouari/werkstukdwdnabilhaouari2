class Anime {
    constructor(id, title, image, synopsis, airing, staff = []) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.synopsis = synopsis;
        this.airing = airing;
        this.staff = staff;
    }
}
export default Anime;
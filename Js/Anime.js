class Anime {
    constructor(id, title, image, synopsis, staff = []) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.synopsis = synopsis;
        this.staff = staff;
    }
}
export default Anime;
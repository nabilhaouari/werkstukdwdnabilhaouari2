class Firebase {
    constructor() {
        firebase.initializeApp({
            apiKey: 'AIzaSyCVdpqkX6nfY8VE62t7q5vorGzq4KeVnqA',
            projectId: 'shionanime-4b2e6'

        });
        this.database = firebase.firestore();
        this.animeCollection = this.database.collection("AnimeList");
        this.convertQuerySnapshotToRegularArray = (querySnapshot) => querySnapshot.docs.map((item) => ({
            id: item.id,
            ...item.data()
        }));
    }
    async renderAnime() {
        let anime;
        this.animeCollection.onSnapshot((querySnapshot) => {
            anime = this.convertQuerySnapshotToRegularArray(querySnapshot);
            console.log(anime);

        });
        return anime;
    }

}
export default Firebase;
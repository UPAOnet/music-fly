
export class FeaturedContent{
  private artists: any;
  private genres: any;

  constructor (

  ) {
  'ngInject';

    this.artists = [
      {name: 'Calvin Harris', source: "/assets/images/artists/calvin-harris.jpg"},
      {name: 'Drake', source: "/assets/images/artists/drake.jpg"}
    ]

    this.genres = [
      {name: 'Pop', source: "/assets/images/genres/pop.jpg"},
      {name: 'Hip Hop', source: "/assets/images/genres/hip-hop.jpg"},
      {name: 'Rock', source: "/assets/images/genres/rock.jpg"},
      {name: 'EDM', source: "/assets/images/genres/clubbing.jpg"},
      {name: 'Jazz', source: "/assets/images/genres/jazz.jpg"},
      {name: 'Country', source: "/assets/images/genres/country.jpg"}
    ]
  }
  
  public getArtists () {
    return this.artists;
  }

  public getGenres () {
    return this.genres;
  }

}
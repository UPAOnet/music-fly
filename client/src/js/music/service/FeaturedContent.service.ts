
export class FeaturedContent{
  private artists: any;
  private genres: any;

  constructor (

  ) {
  'ngInject';

    this.artists = [
      {name: 'Coldplay', source: "/assets/images/artists/coldplay.jpg"},
      {name: 'ChainSmokers', source: "/assets/images/artists/chainsmokers.jpg"},
      {name: 'Kendrick', source: "/assets/images/artists/kendrick.jpg"},
      {name: 'Ariana', source: "/assets/images/artists/ariana.jpg"}
    ]

    this.genres = [     
      {name: 'Hip Hop', source: "/assets/images/genres/hip-hop.jpg"},
      {name: 'Rock', source: "/assets/images/genres/rock.jpg"},
      {name: 'EDM', source: "/assets/images/genres/clubbing.jpg"},
      {name: 'Jazz', source: "/assets/images/genres/jazz.jpg"},
      {name: 'Country', source: "/assets/images/genres/country.jpg"},
      {name: 'Pop', source: "/assets/images/genres/pop.jpg"},
      {name: 'Classical', source: "/assets/images/genres/classical.jpg"},
      {name: 'Metal', source: "/assets/images/genres/metal.jpg"},
      {name: 'RnB', source: "/assets/images/genres/rnb.jpg"},
      {name: 'Romance', source: "/assets/images/genres/romance.jpg"},
      {name: 'Workout', source: "/assets/images/genres/workout.jpg"}
    ]
  }
  
  public getArtists () {
    return this.artists;
  }

  public getGenres () {
    return this.genres;
  }

}
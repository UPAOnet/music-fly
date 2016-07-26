
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
  }
  
  public getArtists () {
    return this.artists;
  }

}
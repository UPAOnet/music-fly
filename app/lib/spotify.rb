require 'rspotify'

class SpotifySearch
  # RSpotify.raw_response = true

  def createSong (spotify_song)
    song = {
      name: results.name,
      image: results.image,
      album: results.album
    }  
  end

  def search(query)
  
    results = RSpotify::Track.search(query) 
    
    new_resuts = results.map do |song| 
      song.name,
      song.album.url,
      song.album.name, 
      song.artists[0].name, 
      song.duration, 
      song.preview_url, 
      song.external_urls.spotify
    end
  end
  
end

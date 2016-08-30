require 'rspotify'

class SpotifySearch
  def search(query)
   return RSpotify::Track.search(query)    
  end
end

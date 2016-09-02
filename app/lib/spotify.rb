require 'rspotify'

class SpotifySearch
  RSpotify.raw_response = true
  def search(query)
   return RSpotify::Track.search(query)    
  end
end

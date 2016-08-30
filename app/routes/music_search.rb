
get '/api/v1/spotify' do
  query = params['search']
  spotify = SpotifySearch.new
  if query
    results = spotify.search(query)
    binding.pry
    return {tracks: spotify.search(query)}.to_json
  end
end
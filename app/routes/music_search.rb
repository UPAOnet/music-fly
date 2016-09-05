
get '/api/v1/spotify' do
  query = params['search']
  spotify = SpotifySearch.new
  if query
    spotify.search(query).to_json

  end
end
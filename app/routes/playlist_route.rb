
post '/api/v1/playlist/:name' do
  
  playlist_name = params["name"]
  halt 404, "No current account to save playlist" unless session["user"]
  
  playlist = create_new_playlist(playlist_name)
  
end

get '/api/v1/playlist' do 
  halt 404, "No current user logged in" unless session["user"]

  playlists = get_current_playlists
  return playlists.to_json
end

delete '/api/v1/playlist/:name' do
  halt 404, "No current user logged in" unless session["user"]
  delete_a_playlist(params["name"])
end
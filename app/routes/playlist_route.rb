
post '/api/v1/playlist' do 
  halt 404 'No current account to save playlist' unless sessions["user"]
  @account = sessions["user"]
  binding.pry
end

get '/api/v1/playlist' do 
  if session["user"]
    return get_current_session
  else 
    return
  end
end
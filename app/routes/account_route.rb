
post '/api/v1/account' do 
  userInfo = JSON.parse(request.body.read)
  @account = Account.new(userInfo)

  if @account
    @account.save
    # Use account id as the session id
    session["user"] = @account.id
    user = get_current_session
    user.to_json
  else 
    halt 404, "Account could not be created"
  end 

end

get '/api/v1/account' do 
  if session["user"]
    user = get_current_session
    return user.to_json
  else 
    return
  end
end

post '/api/v1/account/login' do 
  userInfo = JSON.parse(request.body.read)
  @account = Account.new(userInfo)
  
  user = get_user(@account)
  halt 404, 'Account not found.' unless user

  # Use account id as the session id
  session["user"] = user.id
  return user.to_json
end

post '/api/v1/account/logout' do 
  if session["user"]
    session["user"] = nil
  else 
    halt 404, "No current user"
  end
end



# Creates new accounts
post '/api/v1/account' do 
  userInfo = JSON.parse(request.body.read)
  @account = Account.new(userInfo)
  
  if !@account.save
    return status 400 
  else 
    # Use account id as the session id
    session["user"] = @account.id
    user = get_current_session
    user.to_json
  end 

end

# Gets the current log in session
get '/api/v1/account' do 
  halt 400, 'No current Session' unless session["user"]
  
  user = get_current_session
  return user.to_json
end

# Does user log in
post '/api/v1/account/login' do 
  userInfo = JSON.parse(request.body.read)
  @account = Account.new(userInfo)
  
  user = get_user(@account)
  halt 400, 'Account or Password is invalid' unless user

  # Use account id as the session id
  session["user"] = user.id
  return user.to_json
end

# Does user logout
post '/api/v1/account/logout' do 
  if session["user"]
    session["user"] = nil
  else 
    halt 400, "No current user"
  end
end



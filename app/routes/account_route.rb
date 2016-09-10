
post '/api/v1/account' do 
  userInfo = JSON.parse(request.body.read)
  @account = Account.new(userInfo)


  if @account
    @account.save
    session["user"] = @account.id

    get_current_session
    # @session = @account.sessions.create
		# set_session_cookie(@session.session_token)
  else 
    halt 404, "Account could not be created"
  end 

end

get '/api/v1/account' do 
  if session["user"]
    return get_current_session
  else 
    return
  end
end

post '/api/v1/account/login' do 
  userInfo = JSON.parse(request.body.read)
  @account = Account.new(userInfo)
  user = get_user(@account.username)
  session["user"] = user

  return user

end

post '/api/v1/account/logout' do 
  if session["user"]
    session["user"] = nil
  else 
    halt 404, "No current user"
  end
end



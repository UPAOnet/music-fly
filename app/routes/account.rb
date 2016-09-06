
post '/api/v1/account/new' do 
  userInfo = JSON.parse(request.body.read)
  @account = Account.new(userInfo)


  if @account
    @account.save
    session["value"] = userInfo
    return @account.to_json
    # @session = @account.sessions.create
		# set_session_cookie(@session.session_token)
  else 
    halt 404, 'Account could not be created'
  end 

end

get '/api/v1/account/current' do 
  userInfo = JSON.parse(request.body.read)
  @account = Account.new(userInfo)


  if @account
    @account.save
    session["value"] = userInfo
    return @account.to_json
    # @session = @account.sessions.create
		# set_session_cookie(@session.session_token)
  else 
    halt 404, 'Account could not be created'
  end 

end
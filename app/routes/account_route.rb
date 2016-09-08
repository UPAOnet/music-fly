
post '/api/v1/account' do 
  userInfo = JSON.parse(request.body.read)
  @account = Account.new(userInfo)


  if @account
    @account.save
    session["user"] = @account.id

    return @account.to_json
    # @session = @account.sessions.create
		# set_session_cookie(@session.session_token)
  else 
    halt 404, "Account could not be created"
  end 

end

get '/api/v1/account' do 
  if session["user"]
    current = session["user"]
    account = Account.find_by_id(current) 
    return account.extend(AccountRepresenter).to_json
  else 
    halt 404, "No user logged in"
  end
end

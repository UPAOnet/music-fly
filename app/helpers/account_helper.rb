module AccountHelper
  
  def get_current_session
    current = session["user"]
    account = Account.find_by_id(current)    
    return account.extend(AccountRepresenter)
  end

  def get_user (userInfo)
    @account = Account.authenticate_password(userInfo.username, userInfo.password)
    if @account
      return @account.extend(AccountRepresenter)
    else 
      return nil
    end
  end
  
end
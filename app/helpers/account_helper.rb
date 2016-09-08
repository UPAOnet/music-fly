module AccountHelper
  
  def get_current_user
    current = session["user"]
    account = Account.find_by_id(current) 
    return account.extend(AccountRepresenter).to_json
  end
end
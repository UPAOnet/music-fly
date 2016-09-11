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

  def create_new_playlist (name)
    current = session["user"]
    account = Account.find_by_id(current)
    
    props = {
      name: name,
      account_id: current
    }

    @playlist = Playlist.new(props)
    @playlist.save
  end

  def get_current_playlists
    @current = session["user"]

    # Find all playlists that match the current account
    all = Playlist.where(account_id: @current).order(:id)
    return all
  end

end
# == Schema Information
#
# Table name: accounts
#
#  id                                   :integer          not null, primary key
#  username                             :string
#  password                             :string


class Account < ActiveRecord::Base 
  
  def self.authenticate_password(username, password)
    account = find_by_username(username)
    #check password
    if account && account.password == password
      return account
    end
    #email not found, or bad password
    return nil
  end

end
# == Schema Information
#
# Table name: accounts
#
#  id                                   :integer          not null, primary key
#  name                                 :string
#  account_id                           :string
#  songs                                :text

class Playlist < ActiveRecord::Base
  
  def song_list 
    if self.songs?
      return self.songs
    else 
      return nil
    end
  end

end
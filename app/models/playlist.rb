# == Schema Information
#
# Table name: playlists
#
#  id                                   :integer          not null, primary key
#  name                                 :string
#  account_id                           :string
#  tracks                               :text

class Playlist < ActiveRecord::Base
  serialize :songs
  belongs_to :account

  def track_list 
    if self.tracks?
      return self.tracks
    else 
      return []
    end
  end

end
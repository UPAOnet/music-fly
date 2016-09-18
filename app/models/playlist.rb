# == Schema Information
#
# Table name: playlists
#
#  id                                   :integer          not null, primary key
#  name                                 :string
#  account_id                           :string
#  tracks                               :text

class Playlist < ActiveRecord::Base
  serialize :tracks, Array
  belongs_to :account

end
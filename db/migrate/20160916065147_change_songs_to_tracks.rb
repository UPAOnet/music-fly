class ChangeSongsToTracks < ActiveRecord::Migration
  def change
    rename_column :playlists, :songs, :tracks
  end
end

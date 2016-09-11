class Playlists < ActiveRecord::Migration
  def up
    create_table :playlists do |t|
      t.string :name
      t.integer :account_id
      t.text :songs
    end
  end
end

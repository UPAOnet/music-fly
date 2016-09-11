class CreatePlylistTable < ActiveRecord::Migration
  def change
    create_table :playlist do |t|
      t.string :name
      t.text :songs
    end
  end
end

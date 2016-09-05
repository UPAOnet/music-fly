class Accounts < ActiveRecord::Migration
  def up
    create_table :accounts do |t|
      t.string :username
      t.string :password
    end
  end

  def down
  	drop_table :accounts
  end

end

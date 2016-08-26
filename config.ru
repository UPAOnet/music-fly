require './app/app'

root = ::File.dirname(__FILE__)

set :public_folder, Proc.new  { File.join(root, '/client/dev/public') }

run MusicFlyApp
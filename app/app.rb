require 'sinatra'
require 'pry'

# require_relative 'lib/spotify'
require_relative 'routes/init'

class MusicFlyApp < Sinatra::Application
  root = ::File.dirname(__FILE__)
  set :public_folder, Proc.new  { File.join(root, '../client/dev/public') }

  get '/' do 
    send_file File.join(settings.public_folder, 'index.html')
  end

end


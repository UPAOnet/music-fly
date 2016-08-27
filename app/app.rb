require 'sinatra';

class MusicFlyApp < Sinatra::Base
  root = ::File.dirname(__FILE__)
  set :public_folder, Proc.new  { File.join(root, '../client/dev/public') }

  get '/' do 
    send_file File.join(settings.public_folder, 'index.html')
  end

  get '/api/v1/spotify' do
    "SPOTIFY REQUEST"
  end
end


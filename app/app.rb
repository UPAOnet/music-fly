require 'sinatra'
require 'sinatra/activerecord'
require 'json'
require 'require_all'
require 'pry'

enable :sessions

# require_relative 'lib/spotify'
require_relative './config/environments'
require_relative 'routes/init'
require_rel 'models', 'lib', 'helpers', 'representers'

class MusicFlyApp < Sinatra::Application

  root = ::File.dirname(__FILE__)
  set :public_folder, Proc.new  { File.join(root, '../client/dev/public') }

  helpers AccountHelper

  get '/' do 
    send_file File.join(settings.public_folder, 'index.html')
  end

end


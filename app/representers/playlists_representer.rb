require 'roar/json'
require 'roar/json/collection'

module PlaylistRepresenter
  include Roar::JSON

  property :song_list, render_nil: true
  property :name
  

end
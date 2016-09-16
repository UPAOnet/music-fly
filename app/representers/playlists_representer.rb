require 'roar/json'
require 'roar/json/collection'

module PlaylistRepresenter
  include Roar::JSON

  property :tracks, render_nil: true
  property :name
  

end
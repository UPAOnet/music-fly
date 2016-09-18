require 'roar/json'
require 'roar/json/collection'

module PlaylistRepresenter
  include Roar::JSON

  property :tracks
  property :name
  

end
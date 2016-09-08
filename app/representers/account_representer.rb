require 'roar/json'
require 'roar/json/collection'

module AccountRepresenter
  include Roar::JSON

  property :id
  property :username
end
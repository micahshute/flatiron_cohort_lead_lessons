class Walk < ApplicationRecord
  belongs_to :walker
  belongs_to :dog
end

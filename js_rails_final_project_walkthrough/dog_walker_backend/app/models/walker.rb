class Walker < ApplicationRecord
    has_many :walks, dependent: :destroy
    has_many :dogs, through: :walks
end

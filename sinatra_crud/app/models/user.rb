class User < ActiveRecord::Base
    has_secure_password
    validates :firstname, presence: true, on: :create
    validates :lastname, presence: true, on: :create
    validates :username, uniqueness: true, on: :create
    validates :password, presence: true, on: :create
    validates :password, length: { in: 6..20 }, confirmation: true, unless: ->(u){ u.password.blank? }

    has_many :posts

end
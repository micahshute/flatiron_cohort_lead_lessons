class Owner < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :validatable

  has_many :dogs

  devise :database_authenticatable,
          :jwt_authenticatable,
          :registerable,
          jwt_revocation_strategy: JwtBlacklist


end

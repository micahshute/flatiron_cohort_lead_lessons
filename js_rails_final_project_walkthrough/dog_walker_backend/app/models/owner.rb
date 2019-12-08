class Owner < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :validatable

  has_many :dogs

  validates :name, presence: true
  validates :email, presence: true
  validates :address, presence: true

  devise :database_authenticatable,
          :jwt_authenticatable,
          :registerable,
          jwt_revocation_strategy: JwtBlacklist


end

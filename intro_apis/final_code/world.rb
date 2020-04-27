require_relative './pokemon'
require_relative './api_manager'
require_relative './trainer'
require_relative './fire_pokemon'
require 'pry'

# micah = Trainer.new("Micah", 29, :expert)
# p1 = Arcanine.new("Griffin", "male")
# p2 = Pokemon.new("Pikachu")

# micah.get_starter(p1)
# micah.get_starter(p2)

# micah.throw_pokeball(p2)
APIManager.get_pokemon
binding.pry




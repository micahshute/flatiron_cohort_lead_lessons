require 'httparty'
require 'pry'
class APIManager

    BASE_URL = "https://pokeapi.co/api/v2"


    def self.get_pokemon(page=1)
        url = BASE_URL + "/pokemon"
        res = HTTParty.get(url)
        pokelist = res["results"]
        Pokemon.create_from_api(pokelist)
    end




end


APIManager.get_pokemon
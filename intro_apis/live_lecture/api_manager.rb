require 'httparty'
require 'pry'
# require_relative './pokemon'

class Pokemon

    @@all = []

    def self.all
        @@all
    end

    def self.create_from_api(aoh)
        aoh.each do |h|
            create(h)
        end
    end

    def self.create(h)
        p = new(h)
        p.save
        p
    end


    attr_accessor :name, :url

    # {"name" => "bulbasaur", "url" => "https://pokemonstuff/bulbasaur"}

    def initialize(hsh)
        hsh.each do  |k,v|
            self.send("#{k}=", v)
        end
    end

    def save
        @@all << self
    end

end


class APIManager

    BASE_URL = "https://pokeapi.co/api/v2/"

    def self.get_pokemon
        res = HTTParty.get(BASE_URL + "/pokemon")
        Pokemon.create_from_api(res["results"])
    end


    def self.get_info_about(poke)
        res = HTTParty.get(poke.url)
        binding.pry
    end



end


APIManager.get_pokemon
# APIManager.get_info_about(Pokemon.all.first)
binding.pry
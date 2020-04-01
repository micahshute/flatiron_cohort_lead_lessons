

class Trainer


    attr_reader :name, :age
    attr_accessor :experience, :pokemon

    def initialize(name, age, experience)
        @name, @age, @experience = name, age, experience
        @pokemon = []
    end

    def run_away
        puts "You ran away"
    end


    def catch_pokemon(pokemon)
        @pokemon << pokemon
        pokemon.trainer = self
    end

    def trade_pokemon(p_to_give, t_to_trade_with, p_to_get)
        # p_to give come out of my @pokemon arrya, and go into the other trainers pokemon array
        # p_to_get needs to come in my array and leave the trainers pokemon array
        # p_to_give trainer needs to be set to the new trainer
        # p_toget trainer needs to be set to me!

        @pokemon = @pokemon.select{ |p| p != p_to_give }
        t_to_trade_with.pokemon << p_to_give

        t_to_trade_with.pokemon = t_to_trade_with.pokemon.select{ |p| p != p_to_get }
        @pokemon << p_to_get

        p_to_give.trainer = t_to_trade_with
        p_to_get.trainer = self

    end


end
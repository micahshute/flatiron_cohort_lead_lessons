

class Trainer


    EXPERIENCE = {
        beginner: 0, 
        intermediate: 1, 
        advanced: 2,
        expert: 3, 
        master: 4
    }


    attr_reader :name, :age
    attr_accessor :experience, :pokemon

    def initialize(name, age, experience)
        @name, @age, @experience = name, age, experience
        @pokemon = []
    end

    def get_starter(p)
        if @pokemon.length == 0
            catch(p)
        end
    end

    def run_away
        puts "You ran away"
    end

    def set_free(poke)
       #if the owner owns the pokemon passed in:
       # remove the pokemon from the owner's pokemon array
       # change our pokemon's owner instance variable to nil

       if self.owns_pokemon?(poke)
        poke.trainer = nil
        self.pokemon = self.pokemon.select{|p| p != poke}
       else
        throw ArgumentError.new("You can't set free a Pokemon that you do not own!")
       end
    end

    def throw_pokeball(pokemon)
        prob_of_catch = Pokemon.calc_catch_probability(pokemon, self) #returns some number between 0-100%
        #0-1 10% --> 0.1
        rand_num = Random.new.rand
        if rand_num < prob_of_catch
            catch(pokemon)
        else
            puts "Oh no! The pokemon broke free"
        end
    end



    def owns_pokemon?(p)
        self.pokemon.include?(p)
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


    private

    def catch(pokemon)
        @pokemon << pokemon
        pokemon.trainer = self
    end


end
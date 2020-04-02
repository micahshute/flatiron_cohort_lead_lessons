

class FirePokemon < Pokemon

    attr_accessor :weaknesses, :strong_against


    def initialize(type, name=nil, gender=nil)  
        super(type, name, gender)
        @weaknesses = [:water, :ground]
        @strong_against = [:grass, :steel]
    end

end


class Arcanine < FirePokemon

    def initialize(name, gender)
        super("Arcanine", name, gender)
    end
end
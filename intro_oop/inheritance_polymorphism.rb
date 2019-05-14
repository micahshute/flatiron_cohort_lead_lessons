require 'pry'
class Human

    attr_reader :energy, :name

    def initialize(name)
        @name = name
        @energy = 100
        @resting = false
    end

    def introduce
        puts "Hello, I am #{name}."
    end

    def talk
        puts "Nice weather!"
    end

    def walk 
        if @resting
            puts "I am resting, I cannot walk"
            return false
        end
        if @energy < 10
            puts "I am too tired to walk"
            return false
        end
        puts "I am walking"
        @energy -= 10
        return @energy
    end

    def eat
        if @resting 
            "I cannot eat becaues I am resting"
            return false
        end
        Thread.new{ @resting = true; sleep(5); increase_energy_by(5); @resting = false}
        return true
    end

    def rest
        if @resting
            puts "I am already resting"
            return false
        end
        Thread.new do 
            @resting = true
            sleep(10)
            increase_energy_by(10)
            @resting = false
        end
        return true
    end

    private

    def increase_energy_by(amt)
        @energy += amt
        @energy = 100 if @energy > 100
    end


end

class Muggle < Human

end


class Wizard < Human

    attr_reader :magic

    def initialize(name)
        super(name)
        @spells = []
        @magic = 100
    end

    def talk
        puts "I go to hogwarts!"
    end

    def rest 
        if super
            @magic += 10
            @magic = 100 if @magic > 100
            return true
        end
        return false
    end

    def cast(spell)
        if @resting
            puts "I am resting, I can't do magic"
            return false
        end
        if @magic >= spell.cost
            puts spell.perform(self)
            @magic -= spell.cost
        else
            puts "I am too spent to perform this spell"
            return @magic
        end
    end
end


class Spell

    attr_reader :name, :effect, :cost

    def initialize(name, effect, cost)
        @name, @effect, @cost = name, effect, cost
    end

    def perform(caster)
        if caster.is_a? Wizard 
        # or if caster.class == Wizard
        # or caster.responds_to? :cast
            puts "#{name}! *#{effect}*"
            true
        else
            false
        end
    end
end

micah = Muggle.new("Micah")
harry = Wizard.new("Harry")
stupify = Spell.new("Stupify", "Stun Victim", 10)

binding.pry
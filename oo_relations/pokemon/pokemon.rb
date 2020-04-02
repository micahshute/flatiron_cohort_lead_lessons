
class Pokemon

    @@all = []

    def self.all
        @@all
    end

    def self.create(type, name=nil, gender=nil)
        p = new(type, name, gender)
        p.save
        p
    end


    def self.calc_catch_probability(p, t)

        #y = (1 - e ** -0.3hp) + 0.01 - (lvl - 25 * exp) * 0.02
        return (1 - Math::E ** (-0.3 * (100 - p.hp))) + 0.01 - (p.level - Trainer::EXPERIENCE[t.experience] * 25) * 0.02
        

    end



    attr_accessor :name, :type, :trainer, :hp, :level
    attr_reader :gender

    def initialize(type, name=nil, gender=nil)
        @name, @type, @gender = name, type, gender
        @trainer = nil
        @hp = 100
        @level = 1
    end

    def save
        @@all << self
    end

end






class Pokemon

    @@all = []

    def self.all
        @@all
    end

    def self.create_from_api(arr_of_hshs)
        arr_of_hshs.each do |pokehash|
            self.create(self.format_hash(pokehash))
        end
    end



    def self.format_hash(hsh)
        hsh.each_with_object({}) do |(k,v), mem|
            if k == "name"
                mem[:type] = v
            else
                mem[k.to_sym] = v
            end
        end

    end


    def self.create(type: , url: nil, name: nil, gender: nil)
        p = new(type: type, name: name, gender: gender, url: url)
        p.save
        p
    end


    def self.calc_catch_probability(p, t)
        #y = (1 - e ** -0.3hp) + 0.01 - (lvl - 25 * exp) * 0.02
        return (1 - Math::E ** (-0.3 * (100 - p.hp))) + 0.01 - (p.level - Trainer::EXPERIENCE[t.experience] * 25) * 0.02
    end


    attr_accessor :name, :type, :trainer, :hp, :level, :url
    attr_reader :gender

    def initialize(type: , url: nil, name: nil, gender: nil)
        @name, @type, @gender, @url = name, type, gender, url
        @trainer = nil
        @hp = 100
        @level = 1
    end

    def save
        @@all << self
    end

end






class Pokemon

    @@all = []

    def self.all
        @@all
    end

    def self.create(type:, name: nil, gender: nil, url: nil)
        p = new(type: type, name: name, gender: gender, data_url: url)
        p.save
        p
    end


    def self.calc_catch_probability(p, t)
        #y = (1 - e ** -0.3hp) + 0.01 - (lvl - 25 * exp) * 0.02
        return (1 - Math::E ** (-0.3 * (100 - p.hp))) + 0.01 - (p.level - Trainer::EXPERIENCE[t.experience] * 25) * 0.02
    end

    def self.create_from_api(arr_of_hshs)
        arr_of_hshs.each do |hsh|
            puts format_hash(hsh)
            create(self.format_hash(hsh))
        end
    end

    def self.format_hash(hsh)
        hsh.each_with_object({}) do |(k,v), mem|
            k = :type if k == "name"
            mem[k.to_sym] = v
        end
    end


    attr_accessor :name, :type, :trainer, :hp, :level
    attr_reader :gender

    def initialize(type:, name: nil, gender: nil, data_url: nil)
        @name, @type, @gender = name, type, gender
        @trainer = nil
        @hp = 100
        @level = 1
        @data_url = data_url
    end

    def save
        @@all << self
    end

end





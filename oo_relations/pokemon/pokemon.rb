
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

    attr_accessor :name, :type, :trainer
    attr_reader :gender

    def initialize(type, name=nil, gender=nil)
        @name, @type, @gender = name, type, gender
        @trainer = nil
        @owner = nil
    end

    def save
        @@all << self
    end

end





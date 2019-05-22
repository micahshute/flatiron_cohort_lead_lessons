class Wand

    attr_reader :wood, :core, :length

    def initialize(wood, core, length)
        @wood, @core, @length = wood, core, length
    end

    def to_s
        "#{self.wood.name}, #{self.core.name} core. #{self.length} inches"
    end

    def description
        puts "#{self}: \n\n#{self.wood.name}: \n  #{self.wood.description} \n\n#{self.core.name}: \n  #{self.core.description}"
    end

end
class WandComponent 

    @@all = []

    def self.rand
        @@all.select{|c| c.is_a?(self)}.sample
    end

    def self.mass_assign_from_arrays(names, descriptions)
        raise ArgumentError.new("names and descriptions must be arrays of equal length, not #{names.length} and #{descriptions.length}") unless names.length == descriptions.length
        names.each_with_index{ |name, i| self.new(name, descriptions[i]) }  
    end

    attr_reader :name, :description

    def initialize(name, description)
        @name, @description = name, description
        @@all << self
    end

end
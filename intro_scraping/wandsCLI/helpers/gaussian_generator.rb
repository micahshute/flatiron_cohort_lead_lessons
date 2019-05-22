class GaussianGenerator
    
    def self.rand2
        uniform_random = Random.new
        r = (-2 * Math.log(1 - uniform_random.rand)) ** 0.5
        theta = 2 * Math::PI * (1 - uniform_random.rand)
        return r * Math.cos(theta), r * Math.sin(theta)    
    end

    attr_accessor :mean, :stddev

    def initialize(mean = 0, stddev = 1)
        @mean, @stddev = mean, stddev
        @needs_gen = true
        @next = nil
    end

    def rand
        if @needs_gen
            x,y = self.class.rand2
            @next = y
            @needs_gen = false
            return self.mean + self.stddev * x
        else
            @needs_gen = true
            return self.mean + self.stddev * @next
        end
    end

end
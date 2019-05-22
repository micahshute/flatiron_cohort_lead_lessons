class WandFactory

    def initialize(length_gen: WandLengthGaussianStrategy.new)
        @length_gen = length_gen
    end

    def make_wand
        return Wand.new(Wood.rand, Core.rand, @length_gen.rand)
    end

end
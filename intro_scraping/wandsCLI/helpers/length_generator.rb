class WandLengthGaussianStrategy < GaussianGenerator
    def initialize
        super(11.5, 1.25) # 95% of wands between 9-14 inches: mean of 11.5, stddev of 1.25
    end

    def rand
        return super.round(1)
    end
end
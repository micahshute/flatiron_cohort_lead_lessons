require 'open-uri'
require 'nokogiri'

class WandScraper

    def initialize
        @base_url = "https://www.pottermore.com/writing-by-jk-rowling/wand-"
        @woods_url = @base_url + "woods"
        @cores_url =  @base_url + "cores"
    end

    def scrape
        # Harvest
        woods_page = open(@woods_url)
        woods_html = woods_page.read
        cores_page = open(@cores_url)
        cores_html = cores_page.read

        # Filter
        parsed_woods = Nokogiri::HTML(woods_html)
        parsed_cores = Nokogiri::HTML(cores_html)
        wood_types = parsed_woods.css(".jkr-writing-artefact__text h2").map(&:text)
        wood_descriptions = parsed_woods.css(".jkr-writing-artefact__text h2~p").map(&:text)
        core_types = parsed_cores.css(".jkr-writing-artefact__text h2").map(&:text)
        core_descriptions = parsed_cores.css(".jkr-writing-artefact__text h2~p").map(&:text)
        core_descriptions = core_descriptions.each.with_index.reduce([]){ |memo, (el, i)| i.even? ? memo << el : memo[memo.length - 1] += " #{el}"; memo}
        
        # Transform
        Wood.mass_assign_from_arrays(wood_types, wood_descriptions)
        Core.mass_assign_from_arrays(core_types, core_descriptions)      
    end

end

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


class WandLengthGaussianStrategy < GaussianGenerator
    def initialize
        super(11.5, 1.25) # 95% of wands between 9-14 inches: mean of 11.5, stddev of 1.25
    end

    def rand
        return super.round(1)
    end
end


    
class WandFactory

    def initialize(length_gen: WandLengthGaussianStrategy.new)
        @length_gen = length_gen
    end

    def make_wand
        return SeedWand.new(Wood.rand, Core.rand, @length_gen.rand)
    end

end


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


class Core < WandComponent
end

class Wood < WandComponent
end

class SeedWand

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


WandScraper.new.scrape
factory = WandFactory.new

50.times do
    wand = factory.make_wand
    Wand.create(wood: wand.wood.name, core: wand.core.name, length: wand.length)
end
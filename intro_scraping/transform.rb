require 'open-uri'
require 'nokogiri'
require_relative './gaussian_generator'
require 'pry'
############ HARVEST ################

base_url = "https://www.pottermore.com/writing-by-jk-rowling/wand-"
woods_url = base_url + "woods"
cores_url =  base_url + "cores"

woods_page = open(woods_url)
woods_html = woods_page.read

cores_page = open(cores_url)
cores_html = cores_page.read

############# FILTER #################

parsed_woods = Nokogiri::HTML(woods_html)
parsed_cores = Nokogiri::HTML(cores_html)


wood_types = parsed_woods.css(".jkr-writing-artefact__text h2").map(&:text)
wood_descriptions = parsed_woods.css(".jkr-writing-artefact__text h2~p").map(&:text)

core_types = parsed_cores.css(".jkr-writing-artefact__text h2").map(&:text)
core_descriptions = parsed_cores.css(".jkr-writing-artefact__text h2~p").map(&:text)
core_descriptions = core_descriptions.each.with_index.reduce([]){ |memo, (el, i)| i.even? ? memo << el : memo[memo.length - 1] += " #{el}"; memo}

#############################
######### TRANSFORM #########
#############################

### NOTE: What I could do: 
######### ==> Make 3 objects: WandWoods, WandCore, and Wand, and
######### map the core_types, core_descriptions, wood_types, and wood_desciptions to corresponding
######### arrays of objects, and then use the objects in my program. 

######### Here's another, (in my humble opinion), more elegant way to solve the problem.
######### This should get you excited to ARCHITECT your own Universe!!!!

## BELOW I USE MANY PILLIARS OF OOP! CALL THEM OUT WHEN YOU SEE THEM!


# Make classes for my scraped data

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

#### NOTE:The @@all in the parent class has all components mixed together
class Wood < WandComponent
end

class Core < WandComponent
end


# Make a class for my wand

class Wand


    attr_reader :wood, :core, :length

    def initialize(wood, core, length)
        @wood, @core, @length = wood, core, length
    end

    def to_s
        "#{self.wood.name}, #{self.core.name} core. #{self.length} inches"
    end

    def description
        puts "#{self}: \n #{self.wood.name}: \n #{self.wood.description} \n\n #{self.core.name}: \n #{self.core.description}"
    end

end


# Make a length generator

class WandLengthStrategy < GaussianGenerator
    def initialize
        super(11.5, 1.25) # 95% of wands between 9-14 inches: mean of 11.5, stddev of 1.25
    end

    def rand
        return super.round(1)
    end
end


class WandFactory

    def initialize(length_gen: WandLengthStrategy.new)
        @length_gen = length_gen
    end

    def make_wand
        return Wand.new(Wood.rand, Core.rand, @length_gen.rand)
    end

end

## Now, let's populate!!

Wood.mass_assign_from_arrays(wood_types, wood_descriptions)
Core.mass_assign_from_arrays(core_types, core_descriptions)

factory = WandFactory.new

my_wand = factory.make_wand

binding.pry
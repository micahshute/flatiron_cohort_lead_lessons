require 'pry'

class Shape

    attr_accessor :area

    def initialize(area)
        @area = area
    end

    def draw
        puts "I am a #{self.class.to_s.downcase} with an area of #{self.area} mm"
    end

end

class Circle < Shape

    #override
    def draw
        super
        puts "My radius is #{self.radius} mm"
    end

    def radius
        return (self.area / Math::PI) ** 0.5
    end
end

class Square < Shape

    #override
    def draw
        super
        puts "My sides are #{self.side} mm"
    end

    def side
        return self.area ** 0.5
    end
end


class ShapeDecorator

    def initialize(shape, atrb)
        @shape, @attr = shape, atrb
    end

end

class WithFillColor < ShapeDecorator

    def draw
        @shape.draw 
        puts "Filled with the color #{@attr}"
    end
end

class WithBorder < ShapeDecorator
    
    def draw
        @shape.draw
        puts "With a border of thickness #{@attr}"
    end
end

class WithAction < ShapeDecorator

    def draw
        @shape.draw
        puts "With a highlight indicating clickable!"
    end

    def click
        puts "Perform action #{@attr}!"
    end
end

square = Square.new(9) 
circle = Circle.new(Math::PI * 4)

square.draw # Plain old square
puts
puts
circle.draw # Plain old circle
puts 
puts

square = WithFillColor.new(square, "blue")
square = WithBorder.new(square, 1) 

circle = WithBorder.new(circle, 2)
circle = WithAction.new(circle, "ANIMATE") 

square.draw # Square with fill color and border
puts 
puts
circle.draw # Circle with border and action
puts
circle.click
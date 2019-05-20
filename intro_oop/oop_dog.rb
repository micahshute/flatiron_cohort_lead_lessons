class Dog

    def initialize(name, breed, temperement, weight)
        @name = name
        @breed = breed
        @temperement = temperement
        @weight = weight
        
        # Instance vars below will be set to the same thing for every new dog
        # so we don't need them to be in the initialize method
        @hunger = 100
        @energy = 100
    end

    def walk
        @energy = 0
    end

    def eat
        @hunger -= 70
    end

    def display
        puts "Hi! My name is #{@name}. I am a #{@breed} and I am #{@temperement}."
        @energy > 50 ? puts("I am soooo excited!") : puts("I am tired")
        @hunger > 50 ? puts("FEED MEEEEE!!") : puts("Give me treats")
    end

end



my_dog_1 = Dog.new("Cricket", "Golden Retriever Mix", "Lazy", 55)
my_dog_2 = Dog.new("Griffin", "Carolina Dog", "Annoying", 65)


my_dog_1.display
my_dog_2.display
puts "--------------------------------------"
my_dog_1.walk
my_dog_2.walk

my_dog_1.eat
my_dog_2.eat
puts "--------------------------------------"
my_dog_1.display
my_dog_2.display




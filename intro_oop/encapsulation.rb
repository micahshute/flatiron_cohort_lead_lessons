class Dog
    
    attr_reader :hunger, :name, :owner
    
    def initialize(name, owner = nil)
        @name = name
        @owner = owner
        @hunger = 0
    end

    def change_name(new_name, owner)
        @name = new_name if self.owner == owner
    end

    def owner=(owner)
        @owner = owner if @owner.nil?
    end

    def eat
        @hunger -=30
        @hunger = 0 if hunger < 0
    end

end

 
class Human

    attr_reader :name

    def initialize(name)
        @name = name
        @pets = []
    end

    def add_pet(pet)
        pet.owner = self
        @pets << pet if pet.owner == self
    end

    def pets
        @pets.freeze
    end
end

roger = Human.new("Roger")
pongo = Dog.new("Pongo")

pongo.eat 
puts pongo.hunger # => 0, because our eat method does not allow hunger to drop below 0

pongo.change_name("Pongo you old rascal", roger)
puts pongo.name # => "Pongo" --> changing the name did not go through because roger is not the owner

roger.add_pet(pongo)
pongo.change_name("Pongo you old rascal", roger)
puts pongo.name # => "Pongo you old rascal" because now roger is the owner


cruella = Human.new("Cruella DeVille")
cruella.add_pet(pongo) 
puts cruella.pets # => an empty array because roger is already owned
puts pongo.owner.name # => Roger


pets = cruella.pets 
pets << pongo
puts cruella.pets
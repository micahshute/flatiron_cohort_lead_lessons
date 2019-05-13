## Functional Programming

def dog_walks(dog)
    dog[:energy] = 0 
    dog
end

def dog_eats(dog)
    dog[:hunger] -= 70
    dog
end

def display_dog_info(dog)
    puts "Hi! My name is #{dog[:name]}. I am a #{dog[:breed]} and I am #{dog[:temperment]}."
    dog[:energy] > 50 ? puts("I am soooo excited!") : puts("I am tired")
    dog[:hunger] > 50 ? puts("FEED MEEEEE!!") : puts("Give me treats")
    dog
end

my_dog_1 = {
    name: "Cricket",
    breed: "Golden Retriever Mix",
    temperment: "Lazy",
    weight: 55,
    energy: 100,
    hunger: 100
}

my_dog_2 = {
    name: "Griffin",
    breed: "Carolina Dog",
    temperment: "Annoying",
    weight: 65,
    energy: 100,
    hunger: 100
}

display_dog_info(my_dog_1)
display_dog_info(my_dog_2)
puts "--------------------------------------"
dog_walks(my_dog_1)
dog_walks(my_dog_2)

dog_eats(my_dog_1)
dog_eats(my_dog_2)
puts "--------------------------------------"
display_dog_info(my_dog_1)
display_dog_info(my_dog_2)
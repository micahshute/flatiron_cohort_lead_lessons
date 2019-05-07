## Functional Programming

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

def dog_walks(*dogs)
    dogs.each { |dog| dog[:energy] = 0 }
end

def dog_eats(dog)
    dog[:hunger] -= 10
end

def display_dog_info(dog)
    puts dog.to_s
    dog
end


walk_dog(my_dog_1, my_dog_2)
feed_dog(my_dog_1)
feed_dog(my_dog_2)

display_dog_info(my_dog_1)
display_dog_info(my_dog_2)
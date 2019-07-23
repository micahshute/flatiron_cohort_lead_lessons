todos = [
    "Wake up",
    "Learn Sinatra",
    "Coding challenge",
    "Eat Lunch",
    "Study Algorithms",
    "Study OOP Design Pattenrs",
    "Dinner",
    "Post-dinner coding sesh"
]
todos.each{ |t| Todo.create(item: t)}
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Owner.destroy_all
Walker.destroy_all

micah = Owner.create(name: 'Micah', email: 'micah@shute.com', password: 'password', address: '1234 Streen Road, Las Vegas, NV')

griffin = Dog.create(name: "Griffin", breed: "Carolina Dog", walk_time: 30, owner: micah)
cricket = Dog.create(name: "Cricket", breed: 'Golden Retriever', walk_time: 20, owner: micah)

annabel = Walker.create(name: "Annabel", rate: 23.00, bio: "I love dogs!")


walk1 = Walk.create(dog: griffin, walker: annabel, time: Time.now)
walk2 = Walk.create(dog: cricket, walker: annabel, time: Time.now)
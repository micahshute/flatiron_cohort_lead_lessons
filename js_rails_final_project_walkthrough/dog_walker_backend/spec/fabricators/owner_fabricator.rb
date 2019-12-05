Fabricator(:owner) do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    password { Faker::Games::Pokemon.name }
    address { Faker::Address.street_address }
    dogs(count: 2)
end
Fabricator(:dog) do
    name { Faker::Name.name }
    walk_time { (Random.new.rand * 60 ).floor }
    notes { '' }
end
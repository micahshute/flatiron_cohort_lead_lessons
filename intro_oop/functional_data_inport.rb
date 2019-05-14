
def get_data_from_learn(url, cookie)
    scrape_res = HTTParty.get(url, headers: { 'Cookie' => cookie})
    json = JSON.parse(scrape_res.body)
    return json["students"]
end

def write_students_to_csv(data)
    keys = @data[0].keys
    CSV.open("students.csv", "wb") do |csv|
        csv << keys
        for student in @data
            vals = []
            for key in keys
                vals << student[key]
            end
            csv << vals
        end
    end
end



url = 'https://some/website/api?with-parameters'
cookie = 'SomeCookieString'
data = get_data_from_learn(url, cookie)
write_students_to_csv(data)

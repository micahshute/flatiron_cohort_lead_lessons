class LearnClient

    attr_accessor :url, :cookie

    def initialize(url = 'https://some/website/api?with-parameters', cookie = 'SomeCookieString')
        @url = url
        @cookie = cookie
    end

    def get_student_data 
        res = HTTParty.get(url, headers: { 'Cookie' => cookie})
        res_json = JSON.parse(res.body)
        res_json["students"]
    end

end

class StudentData

    def self.new_from_strategy(strategy)
        self.new(strategy.get_student_data)
    end

    def initialize(data)
        @data = data
    end

    def write
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

end

data = LearnClient.new.get_student_data
StudentData.new(data).write


# If I make every different strategy have a method #get_student_data then I can use several different procedures to obtain data
# as long as my StudentData class knows that the method will always be called the same thing.

# This is an example of a Strategy Design pattern (and it is also a lot like polymorhpism)

# So, I can also just say

StudentData.new_from_strategy(LearnClient.new).write
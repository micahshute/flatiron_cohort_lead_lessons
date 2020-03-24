class CSVParser

    def self.parse_file(path)
        rows = CSV.read(path)
        Question.mass_assign_from_arrays(rows)
        Quiz.populate_quizzes_by_questions(Question.all)
    end

end



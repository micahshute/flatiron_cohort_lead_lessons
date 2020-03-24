
class Quiz

    @@all = []

    def self.all
        @@all
    end

    def self.get_quiz_by_topic(topic)
        quiz = @@all.find do |t|
            t.name == topic
        end
    end

    def self.populate_quizzes_by_questions(questions)
        questions.each do |q|
            find_or_create_quiz_by_question(q)
        end
    end


    def self.find_or_create_quiz_by_question(question)
        q = get_quiz_by_topic(question.topic)
        if q
            q.questions << question
            question.quiz = q
        else
            q = new(question.topic, [question])
            question.quiz = q
        end
    end

    attr_reader :name, :questions

    def initialize(name, questions=[])
        @name, @questions = name, questions
        @@all << self
    end

end


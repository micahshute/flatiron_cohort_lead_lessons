require 'pry'
class CLI

    def initialize
        @current_quiz = nil
        @score = 0
        @total_possible_score = nil
    end

    def call
        CSVParser.parse_file('./data.csv')
        greeting
        quiz_type = setup_quiz
        while !valid_quiz?(quiz_type)
            puts "That isn't a valid response!"
            quiz_type = setup_quiz
        end
        puts "A quiz about #{Quiz.all[quiz_type - 1].name} you say?? Let's do it!\n\n"
        @current_quiz = Quiz.all[quiz_type - 1]
        @total_possible_score = @current_quiz.questions.length
        take_quiz
        display_score
    end

    def greeting
        puts "\n\n\n\n\n\n\n"
        puts "Hello Traveller! Would you like to take a quiz?"
        input = gets.strip.downcase
        if input == "yes"
            puts "Good!\n\n"
        else
            puts "I don't care, you are going to anyway! :)\n\n"
        end
    end

    def display_score
        puts "Your score was #{(@score.to_f / @total_possible_score) * 100}% "
    end

    def setup_quiz
        puts "What type of quiz would you like to take?\n\n"
        display_quiz_types
    end

    def display_quiz_types
         Quiz.all.each.with_index do |q, i|
            puts "#{i+1}. #{q.name}"
         end
         gets.strip.to_i
    end

    def valid_quiz?(input)
        return input.between?(1, Quiz.all.length)
    end

    def valid_answer?(input, answers)
        input.between?(1, answers.length)
    end


    def take_quiz
        puts "Welcome to your quiz about #{@current_quiz.name}\n\n"
        puts "\n\n"
        @current_quiz.questions.each do |q|
            puts q.content
            display_answers(q)
            answer = gets.strip.to_i 
            if valid_answer?(answer, q.answers)
                if q.answers[answer - 1].correct?
                    puts "\n\nRighto, good chap!\n\n"
                    @score += 1
                else
                    puts "\n\nWRONNGGGG\n\n"
                end
            else
                puts "\n\nWRONGGGGGG\n\n"
            end
        end

    end

    def display_answers(question)
        question.answers.each.with_index do |a, i|
            puts "#{i+1}. #{a.content}"
        end
    end


end
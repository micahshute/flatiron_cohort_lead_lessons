require_relative './answer'

class Question

    @@all = []

    def self.all
        @@all
    end

    def self.mass_assign_from_arrays(two_d_arr)
        two_d_arr.each do |arr|
            self.new_from_array(arr)
        end
    end

    def self.new_from_array(arr)
        topic = arr[0].strip
        content = arr[1].strip.capitalize
        answer_strings = arr[2..5].map(&:strip)
        correct_answer_index = arr[6].to_i
        answers = answer_strings.map.with_index do |as, i|
            is_correct = i == correct_answer_index
            Answer.new(as, is_correct)
        end
        new(topic, content, answers)
    end


    attr_reader :topic, :content, :answers
    attr_accessor :quiz

    def initialize(topic, content, arr_answer_objs)
        @topic = topic
        @content = content
        @answers = arr_answer_objs
        @quiz = nil
        @@all << self
    end

    def is_correct?(answer)
        answer.correct?
    end


end

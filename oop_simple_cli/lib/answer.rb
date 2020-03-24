class Answer

    attr_reader :content

    def initialize(content, is_correct)
        @content, @is_correct = content, is_correct
    end

    def correct?
        @is_correct
    end

end
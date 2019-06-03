class Movie

    @@all = []

    attr_accessor :title, :url, :length, :rating

    def self.all
        return @@all
    end

    def initialize(title: title, url: url)
        @title = title
        @url = url
        @length, @rating = nil, nil
        @@all << self
    end

    

end
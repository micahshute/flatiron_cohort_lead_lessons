class PostSiteError < StandardError
    def self.msg
        @@msg ||= "An unexpected error occurred"
    end

    def self.links
        @@links ||= []
    end

    def self.status
        @@status ||= 500
    end
end
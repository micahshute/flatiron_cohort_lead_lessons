class AuthorizationError < PostSiteError
    @@msg = "You are not authorized to see this page"
    @@links = {"/home" => "Go Home" }
    @@status = 401

    def self.msg
        @@msg
    end

    def self.links
        @@links 
    end

    def self.status
        @@status 
    end
end
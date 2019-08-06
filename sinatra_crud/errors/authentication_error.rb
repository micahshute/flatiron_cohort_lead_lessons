class AuthenticationError < PostSiteError
    @@msg = "Unable to authenticate"
    @@links = {'/login' => 'Log In', '/signup' => 'Sign Up' }
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
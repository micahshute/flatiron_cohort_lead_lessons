require_relative './config/env'

use Rack::MethodOverride
use PostsController
use SessionsController
run ApplicationController
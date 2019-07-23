require './config/env'

use Rack::MethodOverride
use TodosController
run ApplicationController
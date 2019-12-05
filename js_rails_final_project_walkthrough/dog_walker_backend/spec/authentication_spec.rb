#authentication_spec.rb
require 'rails_helper'

RSpec.describe 'POST /login', type: :request do
  let(:user) { Fabricate(:owner) }
  let(:url) { '/login' }
  let(:params) do
    {
      owner: {
        email: user.email,
        password: user.password
      }
    }
  end

  context 'when params are correct' do
    before do
      post url, params: params
    end

    it 'returns 200' do
      expect(response).to have_http_status(200)
    end

    it 'returns JTW token in authorization header' do
      expect(response.headers['Authorization']).to be_present
    end

    it 'returns valid JWT token' do
      token_from_request = response.headers['Authorization'].split(' ').last
      decoded_token = JWT.decode(token_from_request, ENV['DEVISE_JWT_SECRET_KEY'], true)
      expect(decoded_token.first['sub']).to be_present
    end
  end

  context 'when login params are incorrect' do
    before { post url }
    
    it 'returns unathorized status' do
      # puts response.headers
      # puts '----'
      expect(response.status).to eq 401
    end
  end
end

RSpec.describe 'DELETE /logout', type: :request do
  let(:url) { '/logout' }

  it 'returns 204, no content' do
    delete url
    # puts response.headers
    expect(response).to have_http_status(204)
  end

  let(:user) { Fabricate(:owner) }
  let(:login_url) { '/login' }
  let(:protected_url) { '/dogs' }
  let(:params) do
    {
      owner: {
        email: user.email,
        password: user.password
      }
    }
  end

  it 'blacklists the jwt token' do
    get protected_url
    expect(response).to have_http_status(401)
    post login_url, params: params
    token = response.headers['Authorization'].split(' ').last
    expect(token).to be_present
    get protected_url, headers: { Authorization: "Bearer #{token}" }
    puts response.body
    expect(response).to have_http_status(200)
    delete url, headers: {Authorization: "Bearer #{token}"}
    get protected_url, headers: { Authorization: "Bearer #{token}"}
    expect(response).to have_http_status(401)
  end 
end
require 'rails_helper'

RSpec.describe 'POST /signup', type: :request do
  let(:url) { '/signup' }
  let(:params) do
    {
      owner: {
        email: 'user@example.com',
        password: 'password'
      }
    }
  end

  context 'when user is unauthenticated' do
    before { post url, params: params }

    it 'returns 200' do
      expect(response.status).to eq 200
    end

    # it 'returns a new user' do
    #   puts response.body
    #   # puts response.headers['Authorization']
    #   # expect(response.body).to match_schema('owner')
    # end

    it 'returns a JWT' do
        puts response.headers['Authorization']
        expect(response.headers['Authorization']).to be_present
    end
  end

  context 'when user already exists' do
    before do
      Fabricate :owner, email: params[:owner][:email]
      post url, params: params
    end

    it 'returns bad request status' do
      expect(response.status).to eq 400
    end

    it 'returns validation errors' do
      json = JSON.parse(response.body)
      expect(json['errors'].first['title']).to eq('Bad Request')
    end
  end
end

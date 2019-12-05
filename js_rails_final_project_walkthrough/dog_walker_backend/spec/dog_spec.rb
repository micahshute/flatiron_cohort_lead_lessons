require 'rails_helper'

RSpec.describe 'GET /dogs', type: :request do
    
let(:owner) { Fabricate(:owner) }
let(:owner2) { Fabricate(:owner) }
let(:url) { '/login' }
let(:params) do
    {
        owner: {
            email: owner.email,
            password: owner.password
        }
    }
end
let(:params2) do
  {
      owner: {
          email: owner2.email,
          password: owner2.password
      }
  }
end


context 'you must be authorized to perform any crud on dogs' do
  it "doesn't allow any unauthorized requests to the dogs controller" do
    get '/dogs' 
    expect(response.status).to eq 401
    get '/dogs/1'
    expect(response.status).to eq 401
    post '/dogs', params: { dog: {name: 'DNE', breed: "none", walk_time: 45}} 
    expect(response.status).to eq 401
    patch '/dogs/1', params: {dog: {name: 'DNE'}}
    expect(response.status).to eq 401
    delete '/dogs/1'
    expect(response.status).to eq 401
  end

end

  context 'authenticated owners can only create/update their own resources' do
    let(:dogsURL) { '/dogs' }
    before do
      
      post '/login', params: params
      @token = response.headers['Authorization'] 
      post '/login', params: params2
      @token2 = response.headers['Authorization'] 
    end

    it 'returns a 404 for unfound dogs' do 
      get '/dogs/1000', headers: { Authorization: @token}
      expect(response.status).to eq 404
    end

    it 'allows an owner to view only their own dogs' do
      get dogsURL, headers: { Authorization: @token }
      body1 = JSON.parse(response.body)
      # p body1
      expect(body1.length).to eq 2
      expect(body1.first['owner_id']).to eq 1
      expect(body1.last['owner_id']).to eq 1

      get dogsURL, headers: { Authorization: @token2}
      body2 = JSON.parse(response.body)
      # p body2
      expect(body2.length).to eq 2
      expect(body2.first['owner_id']).to eq 2
      expect(body2.last['owner_id']).to eq 2
    end

    it 'prevents an owner from updating a dog which is not theirs' do
      patch '/dogs/3', params: {dog: {name: "DNE"}}, headers: {Authorization: @token}
      expect(response.status).to eq 401
    end

    it 'allows an owner to update their dog' do
      patch '/dogs/1', params: {dog: {name: "Bubba"}}, headers: {Authorization: @token}
      expect(response.status).to eq 200
      body = JSON.parse(response.body)
      expect(body["name"]).to eq("Bubba")
    end

    it 'stops someone who is not the owner from deleting a dog' do
      delete '/dogs/3', headers: { Authorization: @token}
      expect(response.status).to eq 401
    end

    it 'prevents someone from viewing a dog which is not theirs' do
      get '/dogs/1', headers: { Authorization: @token2 }
      expect(response.status).to eq 401
    end

  end
end
class ProfileAdapter{


    constructor(baseAdapter){
        this.baseAdapter = baseAdapter
        this.baseURL = this.baseAdapter.baseURL
    }

    get token(){
        return this.baseAdapter.token
    }

    get headers(){
        return this.baseAdapter.headers
    }

    async updateDog(params){
        const { name, breed, walkTime, notes, id} = params
        const url = `${this.baseURL}/dogs/${id}`
        const body = {
            dog: {
                name, 
                breed,
                walk_time: walkTime,
                notes
            }
        }
        const res = await fetch(url, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(body)
        })
        await this.baseAdapter.checkStatus(res)
        return await res.json()
    }

    async getOwner(){

        const res = await fetch(`${this.baseURL}/profile`, {
            headers: this.headers
        })
        await this.baseAdapter.checkStatus(res)
        return await res.json()

    }

}
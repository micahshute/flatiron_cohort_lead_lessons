class PessimisticFetch{

    constructor(setupCleanup, headers, handleError){
        this.setupCleanup = setupCleanup
        this.headers = headers
        this.handleError = handleError
    }


    async get(url, process){
        return await this.call(url, {}, process)
    }

    async patch(url, opts={}, process){
        opts = {...opts, method: 'PATCH'}
        return await this.call(url, opts, process)
    }

    async delete(url, opts={}, process){
        opts = {...opts, method: 'DELETE'}
        return await this.call(url, opts, process)
    }

    async post(url, opts={}, process){
        opts = { ...opts, method: 'POST'}
        return await this.call(url, opts, process)
    }

    async call(url, opts={}, process){
        if(Object.keys(opts).length > 0){
            opts = {...opts, headers: this.headers}
        }
        const cleanupFn = this.setupCleanup()
        try{
            const res = await fetch(url, opts)
            if(!res.ok){ throw res }
            const data = await res.json()
            if(cleanupFn){ cleanupFn() }
            if(process){
                process(data)
            }else{
                return data
            }
        }catch(err){
            this.handleError(err)
        }
    }
}

export { PessimisticFetch }
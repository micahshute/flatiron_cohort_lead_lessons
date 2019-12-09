class LoginPage extends PageManager{

    constructor(container, adapter){
        super(container)
        this.adapter = new LoginAdapter(adapter)
    }

    initBindingsAndEventListeners(){
        this.form = this.container.querySelector('form#login-form')

        this.form.addEventListener('submit', this.handleSubmit.bind(this))
    }

    async handleSubmit(e){
        e.preventDefault()
        const [email, password] = Array.from(e.target.querySelectorAll('input')).map(i => i.value)
        const params = {
            owner: {email, password}
        }
        try{
          await this.adapter.login(params)
          this.redirect('profile')
        }catch(err){
          this.handleError(err)
        }
    }

    get staticHTML(){
        return (`
        <h2>Sign Up</h2>
        <form id="login-form">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" placeholder="Email" required>
          </div>
          <div class="form-group col-md-6">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" required>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Sign in</button>
      </form>
        
        `)
    }


}
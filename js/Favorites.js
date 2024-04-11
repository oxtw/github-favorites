export class GitHubUser{
    static search(username){
        const endpoint = `https://api.github.com/users/${username}`

        return fetch(endpoint)
        .then(data => data.json())
        .then((data) =>{
         
            const{ login, name, public_repos, followers} = data

            return{
                login: login,
                name: name,
                public_repos: public_repos,
                followers: followers
            }
        })
    }
}

//classe que vai conter a lógica dos dados
//como os dados serão estruturados
export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
        this.tbody = this.root.querySelector('table tbody')

        // GitHubUser.search('oxtw').then(user => console.log(user))
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    }

     async add(username) {
        try{

        const user = await GitHubUser.search(username)
        console.log(user)
        if(user.login === undefined){
            throw new Error('Usuário não encotrado')
        }

        this.entries = [user, ...this.entries]
        this.update()
        this.save()
        

        }catch(error){
            alert(error.message)
        }
    }

    save(){
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }

    delete(user) {
        //Higher-order-functions(map, filter, find, reduce)
        // this.entries.length =1
        
        // console.log(this.entries)

        const filteredEntries = this.entries
        .filter(entry => entry.login !== user.login)
        
        this.entries = filteredEntries
        this.update()
        this.save()
    }

}
//classe que vai criar a visualização e eventos do HTML

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.update()
        this.onadd()
    }

    onadd(){
        const addButton = this.root.querySelector('.search button')
        addButton.onclick = () => {
            const { value } = this.root.querySelector('.search input')

            this.add(value)
        }
    }

    update() {
        this.removeAllTr()

        this.entries.forEach( user => {
            const row = this.createRow()

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Imagem de ${user.name}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers

            row.querySelector('.remove').onclick = () => {
               const isOk= confirm('Tem certeza que deseja deletar essa linha?')

               if(isOk){
                this.delete(user)
               }
            }

            this.tbody.append(row)
        })
    }

        createRow(){

           const tr = document.createElement('tr')

            tr.innerHTML = `
        <tr>
        <td class="user">
            <img src="https://github.com/oxtw.png" alt="Imagem de Miguel">
            <a href="https://github.com/oxtw">
                <p>Miguel Weigert</p>
                <span>oxtw</span>
            </a>
        </td><!--user-->
    
        <td class="repositories">
            14
        </td><!--repositories-->
    
        <td class="followers">
            1
        </td><!--followers-->
    
        <td>
            <button class="remove">&times;</button>
        </td>
    </tr>
        `
            return tr
        }


        removeAllTr() {

            this.tbody.querySelectorAll('tr')
                .forEach((tr) => {
                    tr.remove()
                })
        }
    }
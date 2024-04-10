//classe que vai conter a lógica dos dados
//como os dados serão estruturados
export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
        this.tbody = this.root.querySelector('table tbody')
    }

    load() {
        this.entries = [
            {
                login: 'oxtw',
                name: "Miguel Weigert",
                public_repos: '76',
                followers: '120000'
            },

            {
                login: 'Adonaikjr',
                name: "Adonaikjr",
                public_repos: '76',
                followers: '120000'
            }
        ]
       
    }

    delete(user){
        //Higher-order-functions(map, filter, find, reduce)
        // this.entries.length =1
        
        // console.log(this.entries)

        const filteredEntries = this.entries
        .filter(entry => entry.login !== user.login)
        
        console.log(filteredEntries)
    }

}
//classe que vai criar a visualização e eventos do HTML

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.update()
    }

    update() {
        this.removeAllTr()

        this.entries.forEach(user => {

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
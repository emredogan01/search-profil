
const API_URL = 'https://api.github.com/users/'

const form = document.querySelector('#form')
const search = document.querySelector('#search')
const main = document.querySelector('#main')

async function getUser(username){
    try{
        const {data} = await axios(API_URL + username)
        createUserCard(data)
        getRepos(username)
    }catch(err){
        creatErrorCard("Aradığınız Kullanıcı bulunamadı.")
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    const user = search.value

    if(user){
        getUser(user)
        search.value = ''
    }
})

function createUserCard(user){

    const userName = user.name || user.login
    const userBio = user.bio ? `<p>${user.bio}</p>` : "" 

    const cardHTML = `
    <div class="card">
            <img class="user-image" src="${user.avatar_url}" alt="${user.name}">
            <div class="user-info">
                <div class="user-name">
                    <h2>${userName}</h2>
                    <span>${user.login}</span>
                </div>
            </div>
            <p>
                ${userBio}
            </p>
            <ul>
                <li>
                    <i class="fa-solid fa-user-group"></i>
                    ${user.followers}
                    <strong>Followers</strong>
                </li>
                <li>${user.following} <strong>Fallowing</strong></li>
                <li>
                    <i class="fa-solid fa-bookmark"></i>
                    ${user.public_repos}
                    <strong>Repository</strong>
                </li>
            </ul>
            <div class="repos" id="repos">
            </div>
        </div>
    `
    main.innerHTML = cardHTML
}

function creatErrorCard(msg){
    const cardErrorHTML = `
    <div class = "card">
    <h2>${msg}</h2>
    </div>
    `
    main.innerHTML = cardErrorHTML
}

async function getRepos(username){
    try {
      const {data} = await axios(API_URL + username + "/repos")
        addReposToCard(data)
    } catch (error) {
        creatErrorCard("Repoları Çekerken bir hata oluştu.")
    }
}

function addReposToCard(repos){
    const reposElement = document.querySelector('#repos')
    repos.slice(0, 3).forEach((repo)=> {
        const reposLink = document.createElement("a")
        reposLink.href= repo.html_url
        reposLink.target = "_blank"
        reposLink.innerHTML = `
        <i class="fa-solid fa-bookmark"></i>${repo.name}
        `
        reposElement.appendChild(reposLink)
    })

}
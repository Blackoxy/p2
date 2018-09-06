document.addEventListener("DOMContentLoaded", function(event) {
    var username = ""
    var selectName = document.querySelector('#userWho')
    var subButton = document.querySelector('button')
    var repoName;
    var allURL = []
    const options = {
        headers: {
            'Authorization': 'token 4ea959f4da33afac39af6552a90cb794cc68669b'
        }
    }

    subButton.addEventListener('click', function (e){
        e.preventDefault();
        username = selectName.value
        var getUrl = 'https://api.github.com/users/' + username + '/repos';
        getData(getUrl)
    })

    function getData(getUrl){
        return fetch(getUrl, options)
            .then(response => response.json())
            .then(repos => {createGitCard(repos) ; flipCard(repos)})   
        }
    
    
    function createGitCard(repos){
        const gitContainer = document.querySelector('main')
        repos.forEach(repo => {
            gitContainer.innerHTML +=(`
            <div class="repo-card">
            <div class="front">
                <div class="col s12 m3">
                    <div class="card blue-grey darken-1">
                        <div class="card-content black-text">
                            <a class="btn-floating btn-large pulse"><i class="material-icons">star</i></a>
                                <h2>${repo.name}</h2>
                                    <h3>Created On</h3>
                                        <p>${repo.created_at}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="back">
                <a class="repo-url" href=${repo.html_url}>Go To Repo</a>
            </div>
            </div>
            `)
           
            var h2 = document.querySelectorAll('h2')
            var likeButton = document.querySelectorAll('.btn-floating')
            var repoU = document.querySelectorAll('.repo-url')
            allURL.push(repo.html_url)
            
            var logbuttonIndex = function(buttonIndex) {
                var favorites = allURL[buttonIndex]
                var name = h2[buttonIndex].textContent
            
                localStorage.setItem( 'favorites', JSON.stringify(favorites))
                localStorage.setItem( 'name', JSON.stringify(name))
               
            }
           
            likeButton.forEach(function(button, index){
                button.addEventListener('click', function(){
                   logbuttonIndex(index)
                   
                })
            })    
        })
    }


    function flipCard(){
        const repoCards = document.querySelectorAll(".repo-card")
        return repoCards.forEach(repo => {
            return repo.addEventListener('click', (() => {
                repo.classList.toggle('clicked')
                repo.firstElementChild.nextElementSibling.classList.toggle('flipped')
            }))
        })

    }


   
    
})
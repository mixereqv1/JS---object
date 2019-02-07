const getData = {
    getBtn: document.querySelector(".getAPI"),
    swList: document.querySelector(".swList"),
    nextBtn: document.querySelector('.nextPage'),
    prevBtn: document.querySelector('.previousPage'),
    pageNum: document.querySelector('.pageNumber'),
    pageNumber: 1,

    getAllFromSW: function() {
        
        fetch("https://swapi.co/api/people/?page=" + this.pageNumber)
        .then(function(response) {
            return response.json();
        })
        .then(function(responseUnpacked) {
            if(this.swList.querySelectorAll('li').length !== 0){
                return;
            }

            let dane = responseUnpacked.results;
            dane.forEach(function(hero) {

                let li = document.createElement("li");
                let delBtn = document.createElement('i');

                delBtn.className = 'far fa-trash-alt delBtn';
                li.className = 'item'

                li.innerText = hero.name;

                this.swList.appendChild(li);
                li.appendChild(delBtn)
                
            },this);
        }.bind(this));
        
        this.pageNum.innerText = 'Strona: ' + this.pageNumber;
    },

    deleteHero: function(event){
        if(event.target.classList.contains('delBtn')){
            event.target.parentElement.remove();
        }
    },

    nextPage: function() {
        this.clearList();
        this.pageNumber += 1;
        this.getAllFromSW();
        this.pageNum.innerText = 'Strona: ' + this.pageNumber;
    },

    previousPage: function() {
        this.clearList();
        this.pageNumber -=1;
        this.getAllFromSW();
        this.pageNum.innerText = 'Strona: ' + this.pageNumber;
    },

    clearList: function() {
        this.swList.querySelectorAll('li').forEach(function(element){
            element.remove();
        })
    },

    init: function() {
        this.getBtn.addEventListener("click", this.getAllFromSW.bind(this));
        this.swList.addEventListener('click',this.deleteHero.bind(this));
        this.nextBtn.addEventListener('click',this.nextPage.bind(this));
        this.prevBtn.addEventListener('click',this.previousPage.bind(this));
    }
}

getData.init();

let elInput = document.querySelector(".js-input");
let elList = document.querySelector(".js-list");
let elPrevBtn = document.querySelector(".prev");
let elFilmsTemplate = document.querySelector(".films-template").content;
let elNextBtn = document.querySelector(".next");
const API_KEY = "b0a9747e";

let activePage = 1;

const filmsFragment = document.createDocumentFragment()
const renderMovie = (array, node) => {
    node.innerHTML = "";
    array.forEach(e => {
        const newTemplate = elFilmsTemplate.cloneNode(true);

        newTemplate.querySelector(".item__img").src = e.Poster;
        newTemplate.querySelector(".item__title").textContent = e.Title;
        newTemplate.querySelector(".item__type").textContent = e.Type;
        newTemplate.querySelector(".item__year").textContent = e.Years;
        newTemplate.querySelector(".item__id").textContent = e.imdbID;
        filmsFragment.appendChild(newTemplate)
    })

    node.appendChild(filmsFragment);
}

elInput.addEventListener("change", function(evt) {
   const elInputVal = evt.target.value;
   getMovie(elInputVal)
   
})


async function getMovie(value) {
    // const response = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=b0a9747e&s=panda");
    const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${value}&page=${activePage}`);
    const data = await response.json()
    let totalPage = Math.ceil(data.totalResults / 10);
    if(activePage == 1){
        elPrevBtn.setAttribute("disabled", true)
    }else {
        elPrevBtn.removeAttribute("disabled")
    }
    if(activePage == totalPage){
        elNextBtn.setAttribute("disabled", true)
    }else {
        elNextBtn.removeAttribute("disabled")
    }


    renderMovie(data.Search, elList)
}



elPrevBtn.addEventListener("click", () => {
    activePage--
    getMovie()
})

elNextBtn.addEventListener("click", () => {
    activePage++
    getMovie()
})
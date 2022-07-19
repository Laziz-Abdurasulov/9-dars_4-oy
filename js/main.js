let elInput = document.querySelector(".js-input");
let elList = document.querySelector(".js-list");
let elPrevBtn = document.querySelector(".prev");
let elFilmsTemplate = document.querySelector(".films-template").content;
let elPaginationTemplate = document.querySelector(".pagination-template").content;
let elNextBtn = document.querySelector(".next");
let elSelect = document.querySelector(".js-select");
let elPaginatonList = document.querySelector(".pagination");
const API_KEY = "b0a9747e";

const filmsFragment = document.createDocumentFragment()
let elInputVal = "";
let activePage = 1;
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
    
  });
  node.appendChild(filmsFragment);
}

elInput.addEventListener("change", function(evt) {
  elInputVal = evt.target.value;
  getMovie();
  elInput.value = "";
  
})


async function getMovie() {
  // const response = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=b0a9747e&s=panda");
  const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${elInputVal}&page=${activePage}`);
  const data = await response.json()
  let totalPage = (Math.ceil(data.totalResults / 10));
  let  movies =  data.Search;
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

  elPaginatonList.innerHTML = "";
  for(let i = 1; i <= totalPage; i++){
    let newPageTemp = elPaginationTemplate.cloneNode(true);
    newPageTemp.querySelector(".page-link").textContent = i;
    newPageTemp.querySelector(".page-link").dataset.pageId = i;
    elPaginatonList.appendChild(newPageTemp);
  }

  if(elSelect.value == "movie"){
    movies = movies.filter(element => element.Type === "movie")
  }else if(elSelect.value == "series"){
    movies = movies.filter(element => element.Type === "series")
  }
  
  
  renderMovie(movies, elList)
}



elPrevBtn.addEventListener("click", () => {
  activePage--
  getMovie()
})

elNextBtn.addEventListener("click", () => {
  activePage++
  getMovie()
})

elPaginatonList.addEventListener("click", function(evt){
  if(evt.target.matches(".page-link")){
      activePage = evt.target.dataset.pageId
      getMovie()
  }
})

elSelect.addEventListener("click", function(evt){
  getMovie()
})
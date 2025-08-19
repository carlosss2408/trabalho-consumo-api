const content = document.getElementById('content');
let page = Number(window.location.hash.replace("#", ""))
let maxpage = 0

async function getCharacters() {

  const response =
    await fetch(`https://rickandmortyapi.com/api/character${isNaN(page) ? '' : '?page=' + page}`)
  const data = await response.json()
  maxpage = data.info.pages
  const lista = document.createElement('ul')
  let characters = ''
  data.results.forEach(element => {
    characters += `<li>
      <a href="detail.html#${element.id}"> ${element.name} </a>
      <img src="${element.image}" alt="${element.name}"/>
    </li>`
  });
  lista.innerHTML = characters
  content.appendChild(lista)

  let paginate
  if (!page || page === 1) {
    paginate = ` <button id="next" onClick="next()" >Proximo</button>`
  }
  if (page > 1 && page < maxpage) {
    paginate = ` <button id="prev" onClick="prev()">Anterior</button>
    <button id="next" onClick="next()">Proximo</button>
    `
  }
  if (page >= maxpage) {
    paginate = ` <button id="prev" onClick="prev()">Anterior</button>`
  }



  document.getElementById('paginate').innerHTML = paginate
}
getCharacters()


async function next() {
  const newPage = page === 0 ? 2 : page + 1
  window.location.hash = "#" + newPage
  window.location.reload()
}
function prev() {
  const newPage = page === 0 ? 2 : page - 1
  window.location.hash = "#" + newPage
  window.location.reload()
}
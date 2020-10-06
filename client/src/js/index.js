const initSearchBar = () => {
  const search = document.querySelector('#search')
  const cards = [...document.querySelectorAll('.js-card')]
  if (!search || cards.length === 0) return

  const titles = cards.map((card) => {
    return card
      .querySelector('.js-card-title')
      ?.textContent
      .trim()
      .toLowerCase()
  })

  search.addEventListener('input', (event) => {
    cards.forEach((card, index) => {
      const searchText = event.target.value.trim().toLowerCase()
      if (!titles[index].includes(searchText)) {
        card.classList.add('hidden')
      } else {
        card.classList.remove('hidden')
      }
    })
  })
}

initSearchBar()

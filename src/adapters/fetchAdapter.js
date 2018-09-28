export const fetchAdapter = {
  loadCards: () => {
    return fetch('https://raw.githubusercontent.com/crhallberg/json-against-humanity/master/full.md.json').then(res => res.json())
  }
}

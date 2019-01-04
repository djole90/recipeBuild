
let recipes = getRecipe()

const filters = {
    searchText: ''
}

renderRecipes(recipes)

document.querySelector('#addRecipe').addEventListener('click', (e) => {
    e.preventDefault()
    const id = uuidv4()



    recipes.push({
        id: id,
        meal: '',
        steps: '',
        ingredients: [],
        statusSummary: ''
    })

    saveRecipe(recipes)
    renderRecipes(recipes)
    location.assign(`/edit.html#${id}`)
})


document.querySelector('#search').addEventListener('input', (e) => {

    filters.searchText = e.target.value
    renderRecipes(recipes)
})

saveRecipe(recipes)

console.log(recipes)

console.log(filters.searchText)


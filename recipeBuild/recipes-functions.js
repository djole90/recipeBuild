
const saveRecipe = (recipe) => localStorage.setItem('recipes', JSON.stringify(recipe))

const getRecipe = () => {

    const recipeJSON = localStorage.getItem('recipes')

    try {
        return recipeJSON ? JSON.parse(recipeJSON) : []
    } catch (e) {
        return []
    }

}


const removeRecipe = (obj, id) => {

    // find the index of current id
    const findIndex = obj.findIndex((el) => el.id === id)

    // remove it if exist
    if (findIndex > -1) {
        obj.splice(findIndex, 1)
    }
}

const removeIngredient = (id) => {

    // find the index of current id
    const findIndex = recipe.ingredients.findIndex((el) => el.id === id)

    // remove it if exist
    if (findIndex > -1) {
        recipe.ingredients.splice(findIndex, 1)
    }
}


const generateDom = (recipe) => {

    const recipeEl = document.createElement('a')
    const titleEl = document.createElement('p')
    const statusEl = document.createElement('p')


    recipe.statusSummary = generateStatus(recipe)
    statusEl.textContent = recipe.statusSummary

    recipeEl.setAttribute('href', `/edit.html#${recipe.id}`)
    recipeEl.appendChild(titleEl)

    if (recipe.meal.length > 0) {
        titleEl.textContent = recipe.meal
    } else {
        titleEl.textContent = 'NO NAME recipe'
    }

    recipeEl.appendChild(statusEl)

    return recipeEl
}

const renderRecipes = (recipe) => {

    const recipeEl = document.querySelector('#recipes')
    const filteredRecipes = recipe.filter((el) => el.meal.toLowerCase().includes(filters.searchText.toLocaleLowerCase()))

    recipeEl.innerHTML = ''

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((el) => {

            const dom = generateDom(el)
            recipeEl.appendChild(dom)

        })

    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'Nema nista bajo moj'
        recipeEl.appendChild(emptyMessage)
    }
}

const generateDomIngredients = (ing) => {

    const ingredientEl = document.createElement('label')
    const text = document.createElement('span')
    const checkbox = document.createElement('input')
    const removeBtn = document.createElement('button')

    removeBtn.classList.add('#removeIngredient')

    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = ing.status

    removeBtn.textContent = 'remove'



    ingredientEl.appendChild(checkbox)
    ingredientEl.appendChild(text)

    text.textContent = ing.name
    ingredientEl.appendChild(removeBtn)

    checkbox.addEventListener('change', (e) => {
        toggleIngredient(ing.id)
        renderIngredients(recipe.ingredients)
        saveRecipe(recipes)
    })

    removeBtn.addEventListener('click', (e) => {
        removeIngredient(ing.id)
        renderIngredients(recipe.ingredients)
        saveRecipe(recipes)
    })
    return ingredientEl
}


const renderIngredients = (ing) => {
    const ingredients = document.querySelector('#ingredients')

    ingredients.innerHTML = ''


    if (ing.length > 0) {
        ing.forEach((el) => {
            const dom = generateDomIngredients(el)
            ingredients.appendChild(dom)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'Nema nista bajo moj'
        ingredients.appendChild(emptyMessage)
    }
}

const toggleIngredient = (id) => {

    const ing = recipe.ingredients.find((el) => el.id === id)

    if (ing) {
        ing.status = !ing.status
    }
}

const generateStatus = (array) => {

    const trueFilter = array.ingredients.filter((el) => el.status === true)
    const totalPercentChecked = 100 / array.ingredients.length * trueFilter.length

    let status = ''

    if (totalPercentChecked === 100) {
        status = 'all'
    } else if (totalPercentChecked > 70) {
        status = 'almost all'
    } else if (totalPercentChecked > 0) {
        status = 'some of the'
    } else {
        status = 'none of the'
    }

    return `You have ${status} ingredients`
}







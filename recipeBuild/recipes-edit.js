const titleEl = document.querySelector('#recipeTitle')
const stepsEl = document.querySelector('#recipeSteps')
const addEl = document.querySelector('#addIngredient')
const submitIngredient = document.querySelector('#submit')
const removeRecipeButton = document.querySelector('#remove')
const removeIngredientButton = document.querySelector('#removeIngredient')
const recipeId = location.hash.substring(1)

const recipes = getRecipe()



// find id that matches current id

let recipe = recipes.find((el) => el.id === recipeId)

renderIngredients(recipe.ingredients)


if (!recipe) {
    location.assign('/index.html')
}

titleEl.value = recipe.meal
stepsEl.value = recipe.steps


titleEl.addEventListener('input', (e) => {

    recipe.meal = e.target.value
    saveRecipe(recipes)
})

stepsEl.addEventListener('input', (e) => {

    recipe.steps = e.target.value
    saveRecipe(recipes)
})

removeRecipeButton.addEventListener('click', (e) => {

    removeRecipe(recipes, recipeId)
    saveRecipe(recipes)
    location.assign('/index.html')
})

submitIngredient.addEventListener('click', (e) => {

    const ingId = uuidv4()

    if (addEl.value.length > 1) {
        recipe.ingredients.push({
            id: ingId,
            name: addEl.value,
            status: false
        })
    }

    renderIngredients(recipe.ingredients)
    saveRecipe(recipes)

    addEl.value = ''
})

window.addEventListener('storage', (e) => {

    if (e.key === 'recipes') {
        JSON.parse(e.newValue)
        recipe = recipe.find((el) => el.id === recipeId)
    }
    titleEl.value = recipe.meal
    stepsEl.value = recipe.status
})






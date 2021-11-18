// Ex 1
const input = { tag: "JAVASCRIPT" };

const envolvesWithParentheses= (ch, str) => `${ch}${str}${ch}`;
const toLowerCase = str => str.toLowerCase();

envolvesWithParentheses(toLowerCase(input.tag));
//output = "(javascript)" 

// Ex 2
const recipe = { name: "Spaghetti Bolognese", ingredients: ["egg", "salt"] }

// Assuming that this object is immutable, write code to
//  -Add a new ingredient (“cream”) 
//  -Replace “egg” with “egg white”
//  -Remove an ingredient (“egg”)

const addNewIngredient = (newIngredient) => ({
    ...recipe,
    ingredients: [
        ...recipe.ingredients,
        newIngredient
    ]
});

const updateIngredientName = (oldNameIngredient, newNameIngredient) => ({
    ...recipe,
    ingredients: [
        ...recipe.ingredients.map(i => i === oldNameIngredient ? newNameIngredient : i)
    ]
});

const removeIngredient = (ingredient) => ({
    ...recipe,
    ingredients: [
        ...recipe.ingredients.filter(i => i !== ingredient)
    ]
});

console.log('Initial state: ');
console.log(recipe);

console.log('\nAdd a new ingredient (“cream”): ');
console.log(addNewIngredient('cream'));

console.log('\nReplace “egg” with “egg white: ');
console.log(updateIngredientName('egg', 'egg white'));

console.log('\nRemove an ingredient (“egg”): ');
console.log(removeIngredient('egg'));

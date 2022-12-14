import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];
    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'A Test Recipe', 
    //         'This is simply a test', 
    //         'https://upload.wikimedia.org/wikipedia/commons/6/65/Libum_Sweet_Cheesecake_ingredients_%26_recipe_%288411812870%29.jpg',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('Fries', 20)
    //         ]),
    //       new Recipe(
    //         'Another Test Recipe', 
    //         'This is simply a test', 
    //         'https://upload.wikimedia.org/wikipedia/commons/6/65/Libum_Sweet_Cheesecake_ingredients_%26_recipe_%288411812870%29.jpg',
    //         [
    //             new Ingredient('Buns', 2),
    //             new Ingredient('Meat', 1)
    //         ])
    //     ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipe(index: number) {
        return this.recipes[index];
    }

    getRecipes() {
        return this.recipes.slice();
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe:Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A test recipe',
        'This is simply a test',
         'https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg',
         [
            new Ingredient('Meat', 1),
            new Ingredient('Dough', 1)
            ],
         ),
        new Recipe('Another test recipe',
         'This is simply a test',
          'https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg',
          [
              new Ingredient('Meat', 1),
              new Ingredient('Dough', 1),
          ]
          )
      ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice(); // We use slice to copy the arrary
    }

    getRecipe(index: number) {
        return this.recipes.slice()[index]; // We use slice to copy the arrary
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

}

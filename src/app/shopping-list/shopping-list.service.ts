import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
    igredientsChanged = new EventEmitter<Ingredient[]>();

    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

    getIngredients() {
        return this.ingredients.slice(); // We use slice to copy the arrary
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.igredientsChanged.emit(this.ingredients.slice());
    }

    // addIngredients(ingredients: Ingredient[]) {
    //     for (let ingredient of ingredients) {
    //         this.addIngredient(ingredient);
    //     }
    // }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.igredientsChanged.emit(this.ingredients.slice());
    }

}

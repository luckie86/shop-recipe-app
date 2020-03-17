import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    // we use recipes.json at the end to store, otherwise it doesn't work
    url = 'https://shop-recipe-app.firebaseio.com/recipes.json';

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();

        // we dont return put request because we dont need the data in the headers component.

        this.http.put(this.url, recipes).subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>(this.url)
            .pipe(map(recipes => { // Rxjs map operator
                return recipes.map(recipe => { // JS map opeator
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
             }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        );
    }

}

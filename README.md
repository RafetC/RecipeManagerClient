## Recipe Platform Client
The client application was developed with React 16 and the frontend components were developed using 
the APIs developed in the backend.Axios is used in HTTP calls.

### Installation
```
git clone https://github.com/RafetC/RecipeManagerClient.git

cd RecipeManagerClient

git checkout recipemanagerclient

npm start
```

![img.png](/src/images/recipeclientstart.png)

### Usage 
##### Add Recipe
API validation errors encountered while adding a recipe are shown to the user on the screen.

![img.png](/src/images/addingvalidationerror.png)

We can create a new recipe by filling in the relevant fields.

![img.png](/src/images/addrecipe1.png)

![img.png](/src/images/addrecipe2.png)

#### Recipe List
You can see all recipe list from the listing screen.You can filter recipes 
with cooking instructions

![img.png](/src/images/recipelist1.png)

![img.png](/src/images/recipelist2.png)

#### Recipe Detail
When you click a recipe you can see detail of Recipe

![img.png](/src/images/recipedetail1.png)

#### Receipt Update
You can update recipe detail via update component

![img.png](/src/images/recipeupdate1.png)

![img.png](/src/images/recipeupdate2.png)

![img.png](/src/images/recipeupdate3.png)

#### Recipe Delete

You can delete recipe by recipe id with delete component

![img.png](/src/images/recipedelete1.png)

![img.png](/src/images/recipedelete2.png)

### Recipe Update Validation

Recipe validations are executing in update component

![img.png](/src/images/recipeupdatevalidation1.png)

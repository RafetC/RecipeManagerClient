import http from "../http-common";
class RecipeDataService {
    getAll() {
        return http.get("/recipes");
    }
    get(id) {
        return http.get(`/recipes?id=${id}`);
    }
    create(data) {
        return http.post("/addRecipe", data);
    }
    update(data) {
        return http.put(`/updateRecipe`, data);
    }
    delete(id) {
         
        return http.delete(`/deleteRecipe?recipeId=${id}`);
          
    }
    
    findByTitle(title) {
        return http.get(`/recipes?cookInstruction=${title}`);
    }


}
export default new RecipeDataService();



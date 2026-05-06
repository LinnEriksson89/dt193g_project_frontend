<script>
import CategoryForm from '@/components/forms/CategoryForm.vue';
import MovieForm from '@/components/forms/MovieForm.vue';
import PageHeader from '@/components/design/PageHeader.vue';

export default {
    data() {
        return {
            categories: [],
            errorMessage: "",
        }
    },
    methods: {
        //Get all categories
        async getCategories() {
            try {
                //Fetch data, turn response to json, add in categories array.
                const response = await fetch("http://localhost:8000/api/category");

                if (response.ok) {
                    const data = await response.json();
                    this.categories = data;
                    console.log(this.categories);
                }

            } catch (error) {
                this.errorMessage = "Kategorier kunde inte hämtats."
                console.log(error);
            }
        },
        //Add new category
        async addCategory(category) {
            try {
                //Add category with fetch and post
                const response = await fetch("http://localhost:8000/api/category", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(category)
                })

                //If something goes wrong, let the user know.
                if (!response.ok) {
                    this.errorMessage = "Kategorin kunde inte skapas.";
                }

                //Re-fetch categories so that it shows up in the movieform.
                await this.getCategories();
            } catch (error) {
                this.errorMessage = "Kategorin kunde inte skapas.";
                console.log(error);
            }
        },

        //Add new movie
        async addMovie(movie, categories) {

            try {
                //Add movie with fetch and post
                const response = await fetch("http://localhost:8000/api/movie", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(movie)
                })

                //If something goes wrong, let the user know.
                if (!response.ok) {
                    this.errorMessage = "Filmen kunde inte skapas.";
                }

                //Add what categories a movie belongs to.
                //First fetch the id for the latest added movie (bad design because I couldn't figure out the response...)
                const movieIdFetch = await fetch("http://localhost:8000/api/newmovie/");
                let movieId = await movieIdFetch.json();

                //Loop through the category-array and add all the connections.
                categories.forEach(category => {
                    try {

                        fetch("http://localhost:8000/api/connection/", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                movieid: movieId,
                                categoryid: category
                            })
                        })
                    } catch (error) {
                        this.errorMessage = "Något gick fel när filmen skulle läggas in i kategorier.";
                        console.log(error);

                    }
                });

            } catch (error) {
                this.errorMessage = "Filmen kunde inte skapas.";
                console.log(error);
            }
        }
    },
    mounted() {
        //Get categories when page has loaded.
        this.getCategories();
    },
    components: {
        PageHeader,
        CategoryForm,
        MovieForm
    }
}
</script>

<template>
    <PageHeader page-title="Lägg till produkter" />
    <p class="m-2 p-2 max-w-2xl">På den här sidan finns två formulär. I det övre lägger du till nya filmer i databasen
        och i det nedre lägger du till nya kategorier för filmerna.</p>
    <p v-if="errorMessage" class="max-w-full border-4 border-red-600 text-lg font-bold p-2 m-2 text-center">
        {{ errorMessage }}</p>

    <MovieForm :categories="categories" @add-movie="addMovie" />
    <CategoryForm @add-category="addCategory" />

</template>


<style scoped></style>
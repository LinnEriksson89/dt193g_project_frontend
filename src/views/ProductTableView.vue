<script>
//For some reason I can't get methods to work inside a <script setup> so due to lack of thime we're now using the old method.
import ProductTable from '@/components/tables/ProductTable.vue';
import PageHeader from '@/components/design/PageHeader.vue';
import CategoryTable from '@/components/tables/CategoryTable.vue';
import SubHeader from '@/components/design/SubHeader.vue';

export default {
    data() {
        return {
            movies: [],
            categories: [],
            moviesInCategories: [],
            connection: [{ id: 0, movieid: 0, categoryid: 0 }],
            moviesLoading: false,
            categoriesLoading: false,
            moviesError: "",
            categoryError: "",
        }
    },
    methods: {
        //Get all products with fetch
        async getProducts() {
            //set loading variable to true and empty the errorvariable if a previous error is there.
            this.moviesLoading = true;
            this.moviesError = "";

            try {
                //Fetch the data
                const response = await fetch("http://localhost:8000/api/movie/");

                //Turn response to json, add in movies-array and turn loading off.
                if (response.ok) {
                    const data = await response.json();
                    this.movies = data;
                    this.moviesLoading = false;
                } else {
                    //If response is not okay show error.
                    this.moviesLoading = false;
                    this.moviesError = "Tabellen kunde inte hämtas."
                }
            } catch (error) {
                console.log(error)
                this.moviesLoading = false;
                this.moviesError = "Tabellen kunde inte hämtas."
            }
        },

        //Get all categories
        async getCategories() {
            //Set loading to true
            this.categoriesLoading = true;

            try {
                //Fetch data, turn response to json, add in categories array.
                const response = await fetch("http://localhost:8000/api/category/");

                if (response.ok) {
                    const data = await response.json();
                    this.categories = data;
                    this.categoriesLoading = false;
                } else {
                    //If response is not ok show error 
                    this.categoriesLoading = false;
                    this.categoryError = "Kategorier kunde inte hämtats."
                }

            } catch (error) {
                this.categoriesLoading = false;
                this.categoryError = "Kategorier kunde inte hämtats."
                console.log(error);
            }
        },

        //Get what movies that belong to what categories
        async getConnections() {
            try {
                const response = await fetch("http://localhost:8000/api/connection/");

                if (response.ok) {
                    const data = await response.json();
                    this.moviesInCategories = JSON.stringify(data);

                    if (data.length < 1) {

                        this.moviesError += " Filmerna har inte fått några kategorier.";
                    }

                    console.log("movies in categories: " + this.moviesInCategories + " data: " + data);
                } else {
                    this.moviesError += " Filmerna har inte fått några kategorier.";
                    console.log("Kopplingarna mellan filmer och kategorier kunde inte hämtas.");
                }
            } catch (error) {
                console.log(error);
            }
        },

        //Make it possible to delete categories
        async deleteCategory(id) {
            try {
                //Create url from the id of the category
                let url = "http://localhost:8000/api/category/" + id;

                //Use fetch with delete and then run getCategories again
                const response = await fetch(url,
                    {
                        method: "DELETE"
                    }
                )

                if (response.ok) {
                    this.getCategories();
                }

                if (!response.ok) {
                    this.categoryError = "Kategorin kunde inte raderas.";
                }
            } catch (error) {
                this.categoryError = "Något gick fel när kategorin skulle raderas.";
                console.log(error)
            }
        },

        //Change the amount of a movie with +/- buttons
        async changeAmount(newAmount, id) {
            try {
                //Create url from the id of the movie
                let url = "http://localhost:8000/api/updateamount/" + id;

                //Use fetch with post and then run getMovies() again
                const response = await fetch(url,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            amount: newAmount
                        })
                    }
                )

                if (response.ok) {
                    this.getProducts();
                }

                if (!response.ok) {

                    if (response.status === 422) {
                        this.moviesError = "Systemet tillåter bara antal mellan 0 och 999."
                    } else {
                        this.moviesError = "Det gick inte att justera antalet filmer.";
                    }
                }
            } catch (error) {
                this.moviesError = "Något gick fel när antalet filmer skulle justeras.";
                console.log(error)
            }
        }
    },
    mounted() {
        //Runs when page has loaded.
        this.getProducts();
        this.getCategories();
        this.getConnections();
    },
    components: {
        ProductTable,
        CategoryTable,
        PageHeader,
        SubHeader
    }
}



</script>

<template>
    <PageHeader page-title="Produkter" />
    <p class="m-2 p-2 max-w-2xl">I den över tabellen visas alla filmer i systemet. Vill du se eller radera
        kategorier scrolla ner till den undre tabellen eller klicka <a href="#categoriesIntro"
            class="underline text-red-950">här</a>.</p>

    <SubHeader header="Filmer" />
    <p class="m-2 p-2 max-w-2xl">I tabellen nedan visas alla produkter. Det går att justera antalet produkter i lager
        med hjälp av knapparna i kolumnen "justera antal". Filmens beskrivning visas bara på större skärmar då tabellen
        annars blir svårläst på mindre skärmar.</p>
    <p v-if="moviesLoading">Tabellen håller på att läsas in.</p>
    <p class="max-w-full border-4 border-red-600 text-lg font-bold p-2 m-2 text-center" v-if="moviesError">
        {{ moviesError }}
    </p>
    <ProductTable :movies="movies" :categories="categories" :moviesInCategories="moviesInCategories"
        @changeAmount="changeAmount" />

    <SubHeader header="Kategorier" />
    <p class="m-2 p-2 max-w-2xl" id="categoriesIntro">I tabellen nedan visas alla kategorier och det finns möjlighet att
        radera kategorier.
        Kategorins beskrivning visas bara på större skärmar då tabellen annars blir svårläst på mindre skärmar.</p>
    <p v-if="categoriesLoading">Tabellen håller på att läsas in.</p>
    <p class="max-w-full border-4 border-red-600 text-lg font-bold p-2 m-2 text-center" v-if="categoryError">
        {{ categoryError }}
    </p>
    <CategoryTable :categories="categories" @deleteCategory="deleteCategory" />

</template>


<style scoped></style>
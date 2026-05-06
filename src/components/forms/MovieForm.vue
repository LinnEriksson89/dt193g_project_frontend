<script>
export default {
    data() {
        return {
            movieTitle: "",
            movieYear: 0,
            movieDescription: "",
            movieCategories: [],
            moviePrice: 0,
            movieAmount: 0,
        }
    },
    props: ["categories"],
    emits: ["addMovie"],
    methods: {
        //Create movieobject
        createMovie() {
            const newMovie = {
                title: this.movieTitle,
                year: this.movieYear,
                description: this.movieDescription,
                price: this.moviePrice,
                amount: this.movieAmount,
            }

            //Turn proxy-object-thingy into a normal array
            const categories = JSON.parse(JSON.stringify((this.movieCategories)));

            //Use emit to send data to view
            this.$emit("addMovie", newMovie, categories);

            //Reset form
            this.movieTitle = "";
            this.movieYear = 0;
            this.movieDescription = "";
            this.movieCategories = [];
            this.moviePrice = 0;
            this.movieAmount = 0;
        },
    },
}
</script>

<template>
    <form v-on:submit.prevent="createMovie" class="m-2 max-w-xl">
        <fieldset class="border p-2 rounded-lg grid lg:grid-cols-3">
            <legend class="font-bold p-2">Lägg till en film:</legend>

            <label for="title" class="lg:col-start-1">Filmtitel:</label>
            <input type="text" name="title" id="title" maxlength="128" size="60" required v-model="movieTitle"
                class="border m-2 rounded-lg lg:col-start-2 lg:col-span-2 p-2">
            <br />

            <label for="year" class="lg:col-start-1">Utgivningsår:</label>
            <input type="number" name="year" id="year" minlength="4" size="4" min="1800" max="2200" value="2000"
                required v-model="movieYear" class="border m-2 rounded-lg lg:col-start-2 lg:col-span-2 p-2">
            <br />

            <label for="price" class="lg:col-start-1">Pris</label>
            <input type="number" name="price" id="price" size="4" required v-model="moviePrice"
                class="border m-2 rounded-lg lg:col-start-2 lg:col-span-2 p-2">
            <br />

            <label for="amount" class="lg:col-start-1">Antal:</label>
            <input type="number" name="amount" id="amount" min="0" max="999" size="4" required v-model="movieAmount"
                class="border m-2 rounded-lg lg:col-start-2 lg:col-span-2 p-2">
            <br />

            <label for="description" class="lg:col-start-1">Beskrivning:</label>
            <textarea name="description" id="description" maxlength="512" rows="3" cols="50" v-model="movieDescription"
                class="border m-2 rounded-lg lg:col-start-2 lg:col-span-2 p-2"></textarea>
            <br />

            <label for="categories" class="lg:col-start-1" v-if="categories.length > 0">Kategorier:</label>
            <select name="categories" id="categories" class="border m-2 rounded-lg lg:col-start-2 lg:col-span-2 p-2"
                multiple v-if="categories.length > 0" v-model="movieCategories">
                <option v-for="category in categories" :category="category.id" :key="category.id" :value="category.id"
                    :title="category.categorydescription">{{ category.categoryname }}
                </option>
            </select>


            <div class="text-right lg:col-span-2">
                <input type="reset" value="Rensa"
                    class="border m-2 p-2 px-8 rounded-lg bg-red-950 text-neutral-300 border-neutral-300 hover:bg-neutral-300 hover:text-red-950 hover:border-red-950 focus:bg-neutral-300 focus:text-red-950 focus:border-red-950">
                <input type="submit" value="Skicka"
                    class="border m-2 p-2 px-8 rounded-lg bg-red-950 text-neutral-300 border-neutral-300 hover:bg-neutral-300 hover:text-red-950 hover:border-red-950 focus:bg-neutral-300 focus:text-red-950 focus:border-red-950">
            </div>

        </fieldset>
    </form>
</template>


<style scoped></style>
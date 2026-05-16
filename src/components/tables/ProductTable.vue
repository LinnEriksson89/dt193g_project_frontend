<script>
export default {
    props: ["movies", "categories", "moviesInCategories", "connection"],
    emits: ["changeAmount", "deleteMovie", "updateMovie"],
    methods: {
        //Method for adding a movie to the amount.
        addAmount(amount, id) {
            let newAmount = amount + 1;
            this.$emit("changeAmount", newAmount, id);
        },

        //Method for subtracting a movie from the amount.
        subtractAmount(amount, id) {
            let newAmount = amount - 1;
            this.$emit("changeAmount", newAmount, id);
        },

        //Method for deleting a movie.
        removeMovie(id) {
            this.$emit("deleteMovie", id)
        },

        //Method for updating a movie.
        editMovie(id) {
            this.$emit("updateMovie", id)
        },
    }
}
</script>

<template>
    <table class="table-auto border-collapse border border-neutral-900 my-4">
        <thead class="bg-red-950 text-neutral-300">
            <tr>
                <th class="px-2 border border-neutral-300 font-serif">ID</th>
                <th class="px-2 border border-neutral-300 font-serif">Titel</th>
                <th class="px-2 border border-neutral-300 font-serif">Pris</th>
                <th class="px-2 border border-neutral-300 font-serif">Saldo</th>
                <th class="px-2 border border-neutral-300 font-serif">Utgiven</th>
                <th class="px-2 border border-neutral-300 font-serif">Genre</th>
                <th class="px-2 border border-neutral-300 font-serif hidden md:table-cell">Beskrivning</th>
                <th class="px-2 border border-neutral-300 font-serif">Radera</th>
                <th class="px-2 border border-neutral-300 font-serif">Uppdatera</th>
                <th class="px-2 border border-neutral-300 font-serif">Justera antal</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="movie in movies" :movie="movie.value" :key="movie.id">
                <td class="px-2 border border-neutral-900">{{ movie.id }}</td>
                <td class="px-2 border border-neutral-900">{{ movie.title }}</td>
                <td class="px-2 border border-neutral-900">{{ movie.price }}</td>
                <td class="px-2 border border-neutral-900">{{ movie.amount }}</td>
                <td class="px-2 border border-neutral-900">{{ movie.year }}</td>
                <td class="px-2 border border-neutral-900">
                    <div v-if="moviesInCategories.length > 0">
                        <template v-for="connection in moviesInCategories" :connection="connection.value"
                            :key="connection.id">
                            <span
                                v-if="movie.id === connection.movieid">{{categories.find(cat => cat.id === connection.categoryid)?.categoryname + " "}}</span>
                        </template>

                        <span v-if="!moviesInCategories.some(c => c.movieid === movie.id)">Ej tillagd</span>
                    </div>
                </td>
                <td class="px-2 border border-neutral-900 hidden md:table-cell max-w-64 truncate overflow-clip whitespace-nowrap text-ellipsis"
                    :title="movie.description">
                    {{ movie.description }}
                </td>
                <td class="px-2 border border-neutral-900">
                    <button @click="removeMovie(movie.id)"
                        class="border m-2 p-2 px-4 rounded-lg bg-red-950 text-neutral-300 border-neutral-300 hover:bg-neutral-300 hover:text-red-950 hover:border-red-950 focus:bg-neutral-300 focus:text-red-950 focus:border-red-950">
                        Radera
                    </button>
                </td>
                <td class="px-2 border border-neutral-900">
                    <button @click="editMovie(movie.id)"
                        class="border m-2 p-2 px-4 rounded-lg bg-red-950 text-neutral-300 border-neutral-300 hover:bg-neutral-300 hover:text-red-950 hover:border-red-950 focus:bg-neutral-300 focus:text-red-950 focus:border-red-950">
                        Uppdatera
                    </button>
                </td>
                <td class="px-2 border border-neutral-900 grid grid-cols-2">
                    <button @click="subtractAmount(movie.amount, movie.id)"
                        class="border m-2 p-2 px-4 rounded-lg bg-red-950 text-neutral-300 border-neutral-300 hover:bg-neutral-300 hover:text-red-950 hover:border-red-950 focus:bg-neutral-300 focus:text-red-950 focus:border-red-950 col-start-1">
                        -
                    </button>

                    <button @click="addAmount(movie.amount, movie.id)"
                        class="border m-2 p-2 px-4 rounded-lg bg-red-950 text-neutral-300 border-neutral-300 hover:bg-neutral-300 hover:text-red-950 hover:border-red-950 focus:bg-neutral-300 focus:text-red-950 focus:border-red-950 col-start-2">
                        +
                    </button>

                </td>
            </tr>
        </tbody>
    </table>
</template>


<style scoped></style>
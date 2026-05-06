<script>
export default {
    props: ["categories"],
    emits: ["deleteCategory"],
    methods: {
        //Method for deleting category sent to view
        removeCategory(id) {
            this.$emit("deleteCategory", id)
        }
    }
}
</script>

<template>
    <table class="table-auto border-collapse border border-neutral-900 my-4">
        <thead class="bg-red-950 text-neutral-300">
            <tr>
                <th class="px-2 border border-neutral-300 font-serif">ID</th>
                <th class="px-2 border border-neutral-300 font-serif">Namn</th>
                <th class="px-2 border border-neutral-300 font-serif hidden md:table-cell">Beskrivning</th>
                <th class="px-2 border border-neutral-300 font-serif">Radera</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="category in categories" :category="category.value" :key="category.id">
                <td class="px-2 border border-neutral-900">{{ category.id }}</td>
                <td class="px-2 border border-neutral-900">{{ category.categoryname }}</td>
                <td class="px-2 border border-neutral-900 hidden md:table-cell">{{ category.categorydescription }}</td>
                <td class="px-2 border border-neutral-900">
                    <button @click="removeCategory(category.id)"
                        class="border m-2 p-2 px-4 rounded-lg bg-red-950 text-neutral-300 border-neutral-300 hover:bg-neutral-300 hover:text-red-950 hover:border-red-950 focus:bg-neutral-300 focus:text-red-950 focus:border-red-950">
                        Radera
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>


<style scoped></style>
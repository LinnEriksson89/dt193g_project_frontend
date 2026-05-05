<script>export default {
    data() {
        return {
            categoryName: "",
            categoryDescription: "",
        }
    },
    emits: ["addCategory"],
    methods: {
        //Create category object
        createCategory() {
            const newCategory = {
                categoryname: this.categoryName,
                categorydescription: this.categoryDescription
            }

            //Use emit to send data to view
            this.$emit("addCategory", newCategory)

            //Reset form
            this.categoryName = "";
            this.categoryDescription = "";
        }
    },
}
</script>

<template>
    <form v-on:submit.prevent="createCategory" class="m-2 max-w-xl">
        <fieldset class="border p-2 rounded-lg grid lg:grid-cols-3">
            <legend class="font-bold p-2">Lägg till en kategori/genre:</legend>

            <label for="categoryName" class="lg:col-start-1">Namn på kategori:</label>
            <input type="text" name="categoryName" id="categoryName" maxlength="64" v-model="categoryName"
                class="border m-2 rounded-lg lg:col-start-2 lg:col-span-2 p-2">
            <br />

            <label for="categoryDescription" class="lg:col-start-1">Beskrivning:</label>
            <textarea name="categoryDescription" id="categoryDescription" maxlength="128" rows="3" cols="50"
                v-model="categoryDescription" class="border m-2 rounded-lg lg:col-start-2 lg:col-span-2 p-2"></textarea>
            <br />

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
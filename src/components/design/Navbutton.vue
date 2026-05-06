<script setup>
const props = defineProps(["title", "link"]);
</script>

<template>
    <a v-bind:href="props.link">
        <li
            class="border bg-red-950 text-neutral-300 border-neutral-300 p-2 my-2 rounded-lg lg:m-1 lg:px-8 hover:bg-neutral-300 hover:text-red-950 hover:border-red-950 focus:bg-neutral-300 focus:text-red-950 focus:border-red-950">
            {{ props.title }}</li>
    </a>
</template>


<style scoped></style>
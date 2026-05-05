<script setup>
const props = defineProps(["pageTitle"]);
</script>

<template>
    <h2 class="text-2xl font-bold font-serif border-b-2 border-b-red-950 mb-4">{{ props.pageTitle }}</h2>
</template>


<style scoped></style>
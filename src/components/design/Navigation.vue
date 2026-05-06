<script setup>
import Navbutton from './Navbutton.vue';

</script>

<template>
    <nav class="m-auto lg:max-w-fit">
        <ul class="lg:flex">
            <Navbutton title="Start" link="/" />
            <Navbutton title="Om oss" link="/about" />
            <Navbutton title="Filmer" link="/allproducts" />
            <Navbutton title="Lägg till" link="/addproduct" />
        </ul>
    </nav>
</template>


<style scoped></style>
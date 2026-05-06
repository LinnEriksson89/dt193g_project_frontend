<script setup>
import Header from "./components/design/Header.vue"
import Footer from "./components/design/Footer.vue"
import { RouterView } from 'vue-router'
</script>

<template>
    <div id="background" class="bg-red-950 min-h-lvh">
        <div id="wrapper" class="max-w-6xl m-auto bg-neutral-300">
            <Header />
            <main class="p-4">
                <router-view />
            </main>
            <Footer />
        </div>
    </div>
</template>


<style scoped></style>

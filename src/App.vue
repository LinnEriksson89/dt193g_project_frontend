<script setup>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import { RouterView } from 'vue-router'
</script>

<template>
    <div id="background">
        <div id="wrapper">
            <Header />
            <main>
                <router-view />
            </main>
            <Footer />
        </div>
    </div>
</template>


<style scoped></style>

<script>
import PageHeader from '@/components/design/PageHeader.vue';

export default {
    data() {
        return {
            name: "",
            email: "",
            password: "",
            password_confirmed: "",
            errorMessage: "",
            userCreated: ""
        }
    },
    methods: {
        createUser() {
            //Check that password is the same
            if (this.password === this.password_confirmed) {
                const newUser = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }

                this.addUser(newUser);

                //Reset form
                this.name = "";
                this.email = "";
                this.password = "";
                this.password_confirmed = "";
            } else {
                this.errorMessage = "Lösenordet matchar inte.";
            }
        },
        async addUser(newUser) {
            //try-catch to create user with fetch
            try {
                const response = await fetch("http://localhost:8000/api/register/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newUser)
                });

                if (!response.ok) {
                    this.errorMessage = "Användaren kunde inte skapas.";
                } else {
                    this.userCreated = "Användaren har lagts till."
                }
            } catch (error) {
                this.errorMessage = "Något gick fel när användaren skulle skapas.";
                console.log(error);
            }
        }
    },
    components: {
        PageHeader
    }
}
</script>

<template>
    <PageHeader page-title="Registrera dig!" />
    <p class="m-2 p-2 max-w-2xl">Använd formuläret nedan för att registrera ditt konto. Användarnamnet måste vara 4-25
        tecken och lösenordet måste vara minst 12 tecken långt.</p>

    <form v-on:submit.prevent="addUser" class="m-2 max-w-xl">
        <fieldset class="border p-2 rounded-lg grid lg:grid-cols-3">

            <legend class="font-bold p-2">Skapa konto:</legend>
            <span v-if="errorMessage"
                class="max-w-full border-4 border-red-600 text-lg font-bold p-2 m-2 text-center">{{ errorMessage }}</span>
            <br />

            <label for="name" class="lg:col-start-1">Användarnamn:</label>
            <input type="text" v-model="name" required maxlength="32" minlength="4" size="25"
                class="border m-2 rounded-lg lg:col-start-2 lg:col-span-2 p-2">
            <br />

            <label for="email" class="lg:col-start-1">Email:</label>
            <input type="email" v-model="email" name="email" id="email" required maxlength="128" size="25"
                class="border m-2 rounded-lg lg:col-start-2 lg:col-span-2 p-2">
            <br />

            <label for="password" class="lg:col-start-1">Lösenord:</label>
            <input type="password" v-model="password" name="password" id="password" required minlength="12" size="40"
                class="border m-2 rounded-lg lg:col-start-2 lg:col-span-2 p-2">
            <br />

            <label for="password_confirmed" class="lg:col-start-1">Upprepa lösenord:</label>
            <input type="password" v-model="password_confirmed" name="password_confirmed" id="password_confirmed"
                required minlength="12" size="40" class="border m-2 rounded-lg lg:col-start-2 lg:col-span-2 p-2">
            <br />

            <div class="text-right lg:col-span-2">
                <input type="reset" value="Rensa"
                    class="border m-2 p-2 px-8 rounded-lg bg-red-950 text-neutral-300 border-neutral-300 hover:bg-neutral-300 hover:text-red-950 hover:border-red-950 focus:bg-neutral-300 focus:text-red-950 focus:border-red-950">
                <input type="submit" value="Skicka"
                    class="border m-2 p-2 px-8 rounded-lg bg-red-950 text-neutral-300 border-neutral-300 hover:bg-neutral-300 hover:text-red-950 hover:border-red-950 focus:bg-neutral-300 focus:text-red-950 focus:border-red-950">
                <p v-if="userCreated">{{ userCreated }}</p>
            </div>
        </fieldset>
    </form>
</template>


<style scoped></style>
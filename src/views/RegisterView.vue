<script>
export default {
    data() {
        return {
            name: "",
            email: "",
            password: "",
            password_confirmed: "",
            errorMessage: ""
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
                }
            } catch (error) {
                this.errorMessage = "Något gick fel när användaren skulle skapas.";
                console.log(error);
            }
        }
    }
}
</script>

<template>
    <form v-on:submit.prevent="addUser">
        <fieldset>
            <legend>Skapa konto:</legend>
            <span v-if="errorMessage">{{ errorMessage }}</span>
            <br />
            <label for="name">Användarnamn:</label>
            <input type="text" v-model="name" required maxlength="32" minlength="4" size="25">
            <span v-if="nameError">{{ nameError }}</span>
            <br />

            <label for="email">Email:</label>
            <input type="email" v-model="email" name="email" id="email" required maxlength="128" size="25">
            <span v-if="emailError">{{ emailError }}</span>
            <br />

            <label for="password">Lösenord:</label>
            <input type="password" v-model="password" name="password" id="password" required minlength="12" size="40">
            <label for="password_confirmed">Upprepa lösenord:</label>
            <input type="password" v-model="password_confirmed" name="password_confirmed" id="password_confirmed"
                required minlength="12" size="40">
            <span v-if="passwordError">{{ passwordError }}</span>
            <br />

            <div>
                <input type="reset" value="Rensa">
                <input type="submit" value="Skicka">
                <span v-if="userCreated">{{ userCreated }}</span>
            </div>
        </fieldset>
    </form>
</template>


<style scoped></style>
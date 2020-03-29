<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        nuxt-firebase
      </h1>
      <h2 class="subtitle">
        My first-rate Nuxt.js project
      </h2>
      <div id="google-login"></div>
      <client-only>
        <a-button @click="logout" v-if="authUser" type="danger">Logout</a-button>
      </client-only>
      <a-button @click="getUser" type="primary">Get User</a-button>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data () {
    return {
    }
  },
  computed: {
    authUser () {
      return this.$store.state.authUser
    }
  },
  mounted () {
    const firebaseui = require('firebaseui')
    require('firebaseui/dist/firebaseui.css')
    const ui = new firebaseui.auth.AuthUI(this.$fireAuthObj())
    ui.start('#google-login', {
      signInSuccessUrl: '/',
      signInFlow: 'popup',
      signInOptions: [
        this.$fireAuthObj.GoogleAuthProvider.PROVIDER_ID
      ]
    })
  },
  methods: {
    logout () {
      this.$fireAuthObj().signOut().then(function () {
        // Sign-out successful.
      }).catch(function (error) {
        console.log(error)
      })
    },
    getUser () {
      this.$fireAuthObj().currentUser.getIdToken(true).then(function (idToken) {
        console.log(idToken)
      }).catch(function (error) {
        console.log('err = ', error)
      })
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

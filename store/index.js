export const state = () => ({
  authUser: null
})

export const actions = {
  onAuthStateChanged ({ commit }, { authUser }) {
    console.log(authUser)
    if (!authUser) {
      commit('RESET_STORE')
      return
    }
    commit('SET_AUTH_USER', { authUser })
  }
}

export const mutations = {
  SET_AUTH_USER (state, { authUser }) {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email
    }
  },
  RESET_STORE: (state) => {
    state.authUser = null
  }
}

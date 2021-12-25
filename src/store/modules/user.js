export default {
    namespaced: true,

    state() {
        return {
            profile: {
                id: '',
                avatar: '',
                nickname: 'sbsbs',
                account: '',
                mobile: '',
                token: ''
            }
        }
    },
    mutations: {
        setUser(state, payload) {
            state.profile = payload
        }
    }
}
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authToken: "",
        loggedIn: false
    },
    mutations: {
        SET_AUTH_TOKEN(state, token){
            state.authToken = token;
            state.logedIn = true;
        },
        SET_NOT_LOGGED_IN(state){
            state.logedIn = false;
            state.authToken = "";
        }
    },
    actions: {
        login({commit}, token){
            commit('SET_AUTH_TOKEN', token);
            Vue.$cookies.set('auth_token', token);
        },
        reconnect(context){
            const token = Vue.$cookies.get('auth_token');
            if(token){
                context.commit('SET_AUTH_TOKEN', token);
            }
            else{
                context.commit('SET_NOT_LOGGED_IN');
            }
        },
        logout(context){
            Vue.$cookies.remove('auth_token');
            context.commit('SET_NOT_LOGGED_IN');
        }
    },
    getters: {
        isLoggedIn(state){
            return state.logedIn;
        },
        getToken(state){
            return state.authToken;
        }
    }
});

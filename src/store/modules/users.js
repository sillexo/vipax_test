import axios from 'axios'

const state = {
    user: {},
    users: [],
    subscriptions: [],
};

const getters = {
    USER(state) {
        return state.user
    },
    USERS(state) {
        return state.users
    },
    SUBSCRIPTIONS(state) {
        return state.subscriptions
    }
};

const mutations = {
    SET_USER: (state , user) => {
        state.user = user.data;
    },
    SET_USERS: (state , users) => {
        state.users = users.data;
    },
    SET_SUBSCRIPTIONS: (state , subscriptions) => {
        state.subscriptions = subscriptions.data;
    }
};

const actions = {
    getUser({commit}, user) {
        return axios.get('https://api.github.com/users/'+ user)
                .then((response) => {
                    commit('SET_USER', response);
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                });
    },
    getUsers({commit}) {
        return axios.get('https://api.github.com/users?per_page=20')
                    .then((response) => {
                        commit('SET_USERS', response);
                        return response;
                    })
                    .catch((error) => {
                        console.log(error);
                        return error;
                    });
    },
    getSubscriptions({commit, state}) {
        let newUrl = 'https://api.github.com/users/'+ state.user.login +'/following';
        return axios.get(newUrl)
                    .then((response) => {
                        commit('SET_SUBSCRIPTIONS', response);
                        return response;
                    })
                    .catch((error) => {
                        console.log(error);
                        return error;
                    });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}

import axios from 'axios'

const state = {
    repos: [],
};

const getters = {
    REPOS(state) {
        return state.repos
    },
};

const mutations = {
    SET_REPOS: (state , repos) => {
        state.repos = repos.data;
    },
    SET_REPOS_LANGS: (state , reposLanguages) => {
        let repos = state.repos;

        repos = repos.map(repo => {
            if (repo.id == reposLanguages.repoId) {
                repo.languages = reposLanguages.langs.data;
            }
          return repo;
        });
        state.repos = repos;
    },
};

const actions = {
    getRepos({commit, rootState, dispatch}) {
        return axios.get(rootState.users.user.repos_url)
                    .then((response) => {
                        commit('SET_REPOS', response);
                        state.repos.forEach(repo => {
                            dispatch("getReposLangs", repo);
                        });
                        return response;
                    })
                    .catch((error) => {
                        console.log(error);
                        return error;
                    });
    },
    getReposLangs({commit}, repo) {
        return axios.get(repo.languages_url)
                    .then((response) => {
                        commit('SET_REPOS_LANGS', {
                            langs: response,
                            repoId: repo.id
                        });
                        return response;
                    })
                    .catch((error) => {
                        console.log(error);
                        return error;
                    });
    },
};

export default {
    state,
    getters,
    mutations,
    actions
}

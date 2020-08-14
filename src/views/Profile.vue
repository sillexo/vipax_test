<template>
  <div>
    <v-card class="d-inline-block" width="500">
      <v-container>
        <v-avatar size="200">
          <img
            :src="USER.avatar_url"
            :alt="USER.login"
          >
        </v-avatar>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title><a :href="USER.html_url" class="">{{ USER.login }}</a></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Created at {{ new Date(USER.created_at).toLocaleDateString() }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <h3>Subscription</h3>
          <v-list-item
            v-for="subscription in SUBSCRIPTIONS"
            :key="subscription.id"
          >
            <v-list-item-content>
              <v-list-item-title>
                <a :href="subscription.html_url" class="">{{ subscription.login }}</a>
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar>
              <v-img :src="subscription.avatar_url"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </v-container>
    </v-card>

    <v-container grid-list-xl>
      <v-layout wrap>
        <v-flex
          xs12
          sm6
          lg4
          :key="repo.id"
          v-for="repo in REPOS"
        >
          <v-card hover height="100%">
            <v-card-text>
              <h3 class="mb-2"><a :href="repo.html_url" class="">{{ repo.name }}</a></h3>
              <p class="mb-2">{{ repo.description }}</p>
              <div class="created_at">Created at {{ new Date(repo.created_at).toLocaleDateString() }}</div>
              <div class="text-center">
                <v-chip
                    class="white--text ma-2"
                    color=green
                    small
                    v-for="(item, lang) in repo.languages"
                    :key="lang"
                  >
                  {{ lang }}
                </v-chip>
              </div>
              <v-btn :href="repo.clone_url">Clone repository</v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    data() {
      return {
        user: 'sillexo',
      }
    },

    methods: {
      ...mapActions([
        'getUser',
        'getRepos',
        'getSubscriptions',
      ]),
      isMobile() {
        if (screen.width < 1024) {
          return true;
        } else {
          return false;
        }
      },
    },

    computed: {
      ...mapGetters([
        'USER',
        'REPOS',
        'SUBSCRIPTIONS',
      ]),
    },

    async created() {
      await this.getUser(this.user);
      this.getRepos();
      this.getSubscriptions();
    }
  }
</script>

<style lang="sass" scoped="">

</style>

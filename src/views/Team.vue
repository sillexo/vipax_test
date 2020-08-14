<template>
  <v-container grid-list-xl>
    <v-layout wrap>
      <v-flex
        xs12
        sm6
        lg6
      >
        <v-card class="d-inline-block" width="500">
          <v-btn @click="onSort('asc')" text icon><v-icon>mdi-arrow-up</v-icon></v-btn>
          <v-btn @click="onSort('desc')" text icon><v-icon>mdi-arrow-down</v-icon></v-btn>
          <v-container>
            <v-list>
              <v-list-item
                :key="user.id"
                v-for="(user, index) in inTeam"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    <a :href="user.html_url">{{ user.login }}</a>
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-avatar>
                  <v-img :src="user.avatar_url"></v-img>
                </v-list-item-avatar>

                <v-btn @click="deleteUserFromTeam(index)" text icon><v-icon>mdi-delete-forever</v-icon></v-btn>
              </v-list-item>
            </v-list>
          </v-container>
        </v-card>
      </v-flex>

      <v-flex
        xs12
        sm6
        lg6
      >
        <v-card class="d-inline-block" width="500">
          <v-container>
            <v-text-field v-model="searchUser" label="Search User"></v-text-field>
            <v-list>
              <v-list-item
                :key="user.id"
                v-for="(user, index) in filteredUsers"
              >
                <v-btn @click="addUserInTeam(index)" text icon><v-icon>mdi-arrow-left</v-icon></v-btn>
                <v-list-item-content>
                  <v-list-item-title>
                    <a :href="user.html_url">{{ user.login }}</a>
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-avatar>
                  <v-img :src="user.avatar_url"></v-img>
                </v-list-item-avatar>
              </v-list-item>
            </v-list>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import _ from 'lodash'

  export default {
    data() {
      return {
        inTeam: {},
        outTeam: {},
        searchUser: '',
        activeFilters: []
      }
    },

    methods: {
      ...mapActions([
        'getUsers'
      ]),
      deleteUserFromTeam(index) {
        this.filteredUsers.push(this.inTeam[index]);
        this.inTeam.splice(index, 1);
      },
      addUserInTeam(index) {
        this.inTeam.push(this.outTeam[index]);
        this.filteredUsers.splice(index, 1);
      },
      onSort: function(sortType) {
        let clonedData = this.inTeam;
        let orderedData = _.orderBy(clonedData, 'login', sortType);
        this.inTeam = orderedData;
      },
    },

    computed: {
      ...mapGetters([
        'USERS',
      ]),

      filteredUsers: function() {
        const search = this.searchUser.toLowerCase().trim();

        if ( ! search) return this.outTeam;
        return this.outTeam.filter(user => user.login.toLowerCase().indexOf(search) > -1);
      },
    },

    async created() {
      await this.getUsers();
      this.inTeam = this.USERS.slice(0, 10);
      this.outTeam = this.USERS.slice(10);
    }
  }
</script>

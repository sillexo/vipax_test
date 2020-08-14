<template>
  <div id="app">
    <v-app id="app">
      <v-card
        flat
        tile
        >
        <v-toolbar>
          <v-toolbar-title class="mr-10">App</v-toolbar-title>
          <v-toolbar-items>
            <v-btn text v-for="item in menu"
              :key="item.icon"
              :to="item.link"
            >{{ item.title }}</v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-card>

      <v-main>
        <v-container
          class="fill-height"
          fluid
        >
          <v-row
            align="center"
            justify="center"
          >
            <v-col class="text-center">
              <transition name="fade" mode="out-in">
                <router-view  />
              </transition>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>

  export default {
    name: 'App',

    data: () => ({
      menu: [
        { icon: 'home', title: 'Home', link: '/' },
        { icon: 'team', title: 'Team', link: '/team' },
      ]
    })
  };
</script>

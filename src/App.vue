<template>
  <div id="app">
    <div class="loader-container" v-if="loading">
      <div>
        <div class="loader" />
        <span v-html="loadingMessage" />
      </div>
    </div>

    <router-view/>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    loadingMessage: '',
  }),
  created(){
    window.addEventListener("set-loading", this.setLoading);
  },
  destroyed(){
    window.removeEventListener("set-loading", this.setLoading);
  },
  methods: {
    setLoading({ detail }) {
      this.loading = detail.loading;
      this.loadingMessage = detail.message || 'Carregando...';
    }
  }
}
</script>

<style>
@import './styles/base.css';
@import './styles/loader.css';
@import './styles/table.css';
@import './styles/classes.css';
</style>

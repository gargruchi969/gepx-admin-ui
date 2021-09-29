<template>
  <b-tabs v-model="currentSelected" size="is-centered" type="is-toggle">
    <b-tab-item label="Pending"></b-tab-item>
    <b-tab-item label="Approved"></b-tab-item>
    <b-tab-item label="Rejected"></b-tab-item>
  </b-tabs>
</template>

<script>
export default {
  data() {
    return {
      currentSelected: "",
    };
  },
  watch: {
    currentSelected() {
      this.$emit("itemChanged", this.currentSelected);
    },
  },
};
</script>

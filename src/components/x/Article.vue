<template>
  <div class="container">
    <b-table striped hover bordered :items="items" :fields="fields">
      <template #cell(content)="data">
        {{ data.item.content.substring(0, 100) + '...' }}
      </template>
      <template #cell(updated_at)="data">
        {{ data.item.updated_at.substring(0, 19) }}
      </template>
    </b-table>
  </div>
</template>

<script>
  import server from '../../server';
   export default {
    data() {
      return {
        fields: [
           {
            key: 'id',
            sortable: true
          },
          {
            key: 'photo'
          },
          {
            key: 'name',
            sortable: true
          },
          {
            key: 'content'
          },
          {
            key: 'updated_at',
            sortable: true
          }
        ],
        items: [],
        total: 0,
        current: 1
      }
    },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function() {
      server.get('article')
        .then(response => {
          this.items = response.data.data;
          this.total = response.data.last_page;
        })
    }
  }
}
</script>

<style>
  
</style>
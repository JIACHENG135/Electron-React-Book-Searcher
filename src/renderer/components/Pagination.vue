<template>
  <div class="overflow-auto" @click="emitData">
    <!-- Use text in props -->
    <!-- <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
    ></b-pagination> -->

    <!-- Use emojis in props -->
    <!-- <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="⏮"
      prev-text="⏪"
      next-text="⏩"
      last-text="⏭"
      class="mt-4"
    ></b-pagination> -->

    <!-- Use HTML and sub-components in slots -->
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      class="mt-4"
    >
      <template v-slot:first-text><span class="text-success">First</span></template>
      <template v-slot:prev-text><span class="text-danger">Prev</span></template>
      <template v-slot:next-text><span class="text-warning">Next</span></template>
      <template v-slot:last-text><span class="text-info">Last</span></template>
      <template v-slot:ellipsis-text>
        <b-spinner small type="grow"></b-spinner>
        <b-spinner small type="grow"></b-spinner>
        <b-spinner small type="grow"></b-spinner>
      </template>
      <template v-slot:page="{ page, active }">
        <b v-if="active">{{ page }}</b>
        <i v-else>{{ page }}</i>
      </template>
    </b-pagination>
  </div>
</template>

<script>
  
  export default {
    name: 'PageCounter',
    props: {rows:Number,perPage:Number,currentPage:Number},
    data() {
      return {
        rows,
        perPage,
        currentPage,
      }
    },
    computed:{
      
      cpage(){
        
        return mynumber
      }
    },
    methods:{
      emitData(){
        let mynumber = this.currentPage;
        this.$emit('messageData',mynumber)
      }
    }
  }
</script>
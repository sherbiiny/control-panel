<template>
  <main class="ClientsList">
    <v-container>
      <v-form class="theForm">
        <v-text-field height="45px" label="البحث"></v-text-field>
        <v-select height="45px" :items="selectItems" v-model="selectBy" label="بحث بواسطة" class="mr-10"></v-select>
        <v-icon large @click="$router.push({name: 'Home'})">fa fa-home</v-icon>
      </v-form>

      <v-row>
        <v-col lg="4" v-for="client in clients" :key="client.cardNum">
          <v-card class="client" router :to="{name: 'Client', params: {client_id: client.cardNum}}">
            {{ client.clientName }}
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import db from '../firebase'

export default {
  data() {
    return {
      selectItems: [
        {text: 'الإسم', value: 'name'},
        {text: 'رقم التليفون', value: 'phone'},
        {text: 'رقم البطاقة', value: 'cardNum'}
      ],
      selectBy: 'name',
      clients: []
    }
  },

  mounted() {
    db.collection('clients').get()
      .then(res => {
        res.docs.forEach(doc => {
          for(let i=0; i<50; i++) {
            this.clients.push(doc.data())
          }
        })
      })
  },
}
</script>

<style lang="scss">
.ClientsList {
  .theForm {
    display: grid;
    gap: 30px;
    grid-template-columns: 5fr 3fr .5fr;
  }

  .client {
    padding: 20px;
    display: grid;
    justify-content: center;
    align-items: center;
    font: 600 20px 'Cairo';
    color: #666;
    letter-spacing: 0 !important;
  }
}
</style>
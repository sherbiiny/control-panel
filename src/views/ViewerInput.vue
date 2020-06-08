<template>
  <main class="viewerInput">
    <v-form class="form" @submit.prevent="submit()">
      <v-container>
        <h1>اضافة عميل استفساري</h1>
        <!-- Fields -->
        <v-text-field v-model="clientName" required label="الإسم الرباعي"></v-text-field>
        <v-text-field v-model="phone" required label="رقم التليفون"></v-text-field>
        <v-text-field v-model="reason" required label="سبب الزيارة"></v-text-field>
        <v-textarea v-model="notes" label="ملاحظات"></v-textarea>
        <p v-if="feedback" class="feedback text-center">{{ feedback }}</p>
        <v-btn type="submit" :loading="loading">تسجيل</v-btn>
        <v-icon large @click="$router.push({name: 'Home'})">fa-arrow-circle-left</v-icon>
      </v-container>
    </v-form>
    <v-snackbar v-model="snackbar">
      تم تسجيل العميل بنجاح
      <v-btn text color="primary" @click.native="snackbar = false">اغلاق</v-btn>
    </v-snackbar>
  </main>
</template>

<script>
import db from '../firebase'
import $ from 'jquery'

export default {
  data() {
    return {
      // Variables relted to database
      clientName: null,
      phone: null,
      reason: null,
      notes: null,

      // Other variables
      feedback: null,
      snackbar: false,
      loading: false
    }
  },

  methods: {

    setData(id) {

      db.collection('viewers').doc(id).set({
        clientName: this.clientName,
        phone: this.phone,
        notes: this.notes,
        reason: this.reason
      })
        .then(() => {
          this.snackbar = true
          this.resetForm()
          this.loading = false
        })
        .catch(err => console.log(err))
    },

    // Set data to firebase
    submit() {
      this.loading = true
      db.collection('viewers').get()
        .then(res => {
          let docID = res.docs.length + 1
          this.setData(docID.toString())
        })
    },

    resetForm() {
      this.clientName = null,
      this.phone = null,
      this.reason = null,
      this.notes = null
    },
  },
}
</script>

<style lang="scss">
@import '../assets/styles/input';


</style>
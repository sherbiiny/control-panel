<template>
  <main class="shopInput">
    <v-form class="form" @submit.prevent="submit">
      <v-container>
        <!-- Fields -->
        <v-text-field v-model="sNum" label="رقم المحل"></v-text-field>
        <v-select :items="floorItems" label="الدور" v-model="floor"></v-select>
        <v-text-field v-model="block" label="البلوك"></v-text-field>
        <v-text-field v-model="area" label="مساحة المحل"></v-text-field>
        <v-select menu-props="auto" :items="bookedItems" v-model="booked"></v-select>
        <v-text-field v-model="meterPrice" label="سعر المتر"></v-text-field>
        <!-- Function to calc total price -->
        <!-- <v-text-field disabled v-model="totalPrice" label="السعر الإجمالي"></v-text-field> -->
        <p v-if="feedback" class="feedback text-center">{{ feedback }}</p>
        <v-btn type="submit">تسجيل</v-btn>
      </v-container>
    </v-form>
    <v-snackbar v-model="snackbar">
      تمت اضافة المحل بنجاح
      <v-btn text color="primary" @click.native="value = false">اغلاق</v-btn>
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
      sNum: null,
      floor: null,
      block: null,
      area: null,
      booked: false,
      meterPrice: null,
      totalPrice: null,
      
      // Variables relted to select element
      floorItems: [
        {text: "الدور الأرضي", value: 1},
        {text: "الدور الأول", value: 2},
        {text: "الدور الثاني", value: 3},
      ],
      bookedItems: [
        {text: "متاحة للبيع", value: false},
        {text: "غير متاحة للبيع", value: true},
      ],

      // Other variables
      feedback: null,
      snackbar: false,
    }
  },

  methods: {

    setData(id) {
      db.collection('shops').doc(id).set({
        sNum: this.sNum,
        floor: this.floor,
        block: this.block,
        area: this.area,
        booked: this.booked,
        meterPrice: this.meterPrice,
        totalPrice: this.meterPrice * this.area
      })
        .then(() => {
          this.snackbar = true
          this.resetForm()
        })
        .catch(err => console.log(err))
    },

    // Set data to firebase
    submit() {
      let id = `${this.floor}${this.block}-${this.sNum}`
      db.collection('shops').doc(id).get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            this.feedback = "هذا المحل تمت اضافته من قبل"
            console.log(this.feedback)
          }

          else this.setData(id)
      })
    },

    resetForm() {
      this.sNum = null
      this.floor = null
      this.block = null
      this.area = null
      this.booked = false
      this.meterPrice = null
      this.totalPrice = null
    }
  },
}
</script>

<style lang="scss">
@import '../assets/styles/input';
</style>
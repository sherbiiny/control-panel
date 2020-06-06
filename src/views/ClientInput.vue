<template>
  <main class="clientInput">
    <v-form class="form" @submit.prevent="submit()">
      <v-container>
        <h1>اضافة عميل جديد</h1>
        <!-- Fields -->
        <v-text-field v-model="cardNum" required :rules="cardNumRules" label="رقم البطاقة"></v-text-field>
        <v-text-field v-model="clientName" required label="الإسم الرباعي"></v-text-field>
        <v-text-field v-model="phone" required label="رقم التليفون"></v-text-field>
        <v-text-field v-model="shopId" required @keyup="getTotalPrice()" label="رقم المحل"></v-text-field>  
        <v-text-field v-model="totalPrice" required label="المبلغ الكلي للمحل" disabled></v-text-field>
        <v-text-field v-model="paid" required @keyup="calcMoneyLeft()" label="المقدم المدفوع"></v-text-field>
        <v-text-field v-model="moneyLeft" required label="المبلغ المتبقي" disabled></v-text-field>
        <v-text-field v-model="date" required label="تاريخ الاقساط"></v-text-field>
        <p v-if="feedback" class="feedback text-center">{{ feedback }}</p>
        <v-btn type="submit">تسجيل</v-btn>
        <v-icon large @click="$router.push({name: 'Home'})">fa-arrow-circle-left</v-icon>
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
      cardNum: null,
      clientName: null,
      phone: null,
      shopId: null,
      paid: null,
      moneyLeft: null,
      date: null,
      totalPrice: null,

      // Other variables
      feedback: null,
      snackbar: false,

      // Card number rules
      cardNumRules: [
        v => (v && v.length == 14) || "رقم البطاقة غير صحيح",
      ],
    }
  },

  methods: {

    setData() {
      db.collection('clients').doc(this.cardNum).set({
        cardNum: this.cardNum,
        clientName: this.clientName,
        phone: this.phone,
        shopId: this.shopId,
        paid: this.paid,
        moneyLeft: this.moneyLeft,
        totalPrice: this.totalPrice,
        date: this.date
      })
        .then(() => {
          this.snackbar = true
          this.resetForm()
        })
        .catch(err => console.log(err))
    },

    // Set data to firebase
    submit() {
      db.collection('clients').doc(this.cardNum).get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            this.feedback = "هذا العميل موجود بالفعل"
          }

          else this.setData()
      })
    },

    resetForm() {
      this.shopId = null
      this.cardNum = null
      this.moneyLeft = null
      this.paid = null
      this.date = false
      this.phone = null
      this.totalPrice = null
      this.clientName = null
    },

    getTotalPrice() {
      // Get shop data
      if(this.shopId) {
        db.collection('shops').doc(this.shopId.toString()).get()
          .then(res => this.totalPrice = res.data().totalPrice)
      }
    },

    calcMoneyLeft() {
      this.moneyLeft = this.totalPrice - this.paid
      console.log(this.moneyLeft)
    }
  },
}
</script>

<style lang="scss">
@import '../assets/styles/input';

</style>
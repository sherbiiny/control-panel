<template>
  <main class="Home">
    <h1>الجمعية التعاوينة للبناء و الإسكان لأهالي المنصورة  قراها</h1>
    <h2>نظام إدارة الحسابات و المحلات</h2>
    <div class="btn-contaienr">
      <router-link :to="{name: 'ShopInput'}">اضافة محل</router-link>
      <router-link :to="{name: 'ClientInput'}">اضافة عميل</router-link>
      <router-link :to="{name: 'ClientInput'}">اضافة عميل استفساري</router-link>
      <router-link :to="{name: 'ClientInput'}">قائمة العملاء</router-link>
      <router-link :to="{name: 'ClientInput'}">قائمة المحلات</router-link>
      <router-link :to="{name: 'ClientInput'}">اضافة قسط مدفوع</router-link>
    </div>
  </main>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
$sec: #FE0;
$prim: #02052B;
$btn: #EEE;

.Home {
  background-image: url('../assets/img/Path 1.svg');
  background-size: cover;
  height: 100%;
  width: 100%;
  background-position: center -80px;
  padding-top: 50px;
  text-align: center;

  h1 {
    color: #FFF;
  }

  h2 {
    color: #FFF;
    position: relative;
    width: 100%;
    background: $prim;
    z-index: 2;
    border-bottom: 3px solid $sec;
    padding-bottom: 30px;
    margin: 30px 0;
  }

  .btn-contaienr {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    max-width: 900px;
    margin: auto;
  }
  a {
    background: $btn;
    display: grid;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 100px;
    text-decoration: none !important;
    color: $prim !important;
    font-size: 1.2em;
    margin: 30px auto;
  }
}
</style>
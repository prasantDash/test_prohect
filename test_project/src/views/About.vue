<template>
  <div class="about">
    <h1>This is an about page</h1>
    <HelloWorld />
    <UserDetail />
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import UserDetail from '@/components/UserDetail.vue'
export default {
  name: 'Home',
  components: {
    UserDetail,
    HelloWorld
  }
}
</script>

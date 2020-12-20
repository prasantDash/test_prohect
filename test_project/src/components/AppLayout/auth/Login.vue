<template src="./Login.html"></template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import CompanyFooter from '../company/CompanyFooter.vue'
export default {
	name: 'Login',
  data (){
    return {
      username: "",
      password: ""
    }
  },
	components: {
		CompanyFooter 
	},
  methods: {
    userlogin: function (){
      let inputUsername = this.username
      let inoutpassword = this.password
      const loginURL = 'http://devapi.trackervigil.com/jwt/userdblogin.php'
      
      const params = {
        username: inputUsername,
        password: inoutpassword,
      }
      axios.post(loginURL, JSON.stringify(params))
      .then((response) => {
        if (response.data.Status === 1) {
          localStorage.setItem('tocken', response.data.tocken)
          localStorage.setItem('loginUserName', response.data.username)
          localStorage.setItem('loginFlag',1)

          let setUserState = this.$store.dispatch('getAllUser')
          if(setUserState){
            this.$router.push('/admin')
          }          
        } else {
          alert(response.data.Message)
        }
      })

      
      
    }
  }  
}
</script>
<style scoped>
#login{
	margin-top:50px;
}
img#guidanceTranImg{
	height:600px;
	width:100%;
}
form{
	margin: 35px;
}

input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
	border-top: hidden;
	border-left: hidden;
	border-right: hidden;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

.cancelbtn {
  //width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

img.avatar {
  width: 40%;
  border-radius: 50%;
}

.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
     display: block;
     float: none;
  }
  .cancelbtn {
     width: 100%;
  }
}
</style>
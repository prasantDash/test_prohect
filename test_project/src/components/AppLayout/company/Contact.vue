<template src="./Contact.html"></template>
<script>
import ContactUsForm from './ContactUsForm.vue'
import CompanyFooter from './CompanyFooter.vue'
export default {
 name: 'Contact',
 components: {
    ContactUsForm,
    CompanyFooter 
  },  
}
</script>
<style scoped>
	div.addressOfContact{
		background-color: #f7f3f3;
		color: #111111;
		margin-top: 10px;
		padding-top: 20px;
		margin-bottom: 20px;
	}
	div.messCss{	
		margin-top: 50px;
	}
</style>
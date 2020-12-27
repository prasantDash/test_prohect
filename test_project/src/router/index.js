import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import AppLayout from '@/components/AppLayout/admin/AppLayout.vue'
import AuthLayout from '@/components/AppLayout/auth/AuthLayout.vue'
import CompanyLayout from '@/components/AppLayout/company/CompanyLayout.vue'

Vue.use(VueRouter)




const routes = [
{
    path: '/admin',
    name: 'Admin',
    component: AppLayout,
    beforeEnter: (to, from, next) =>{
      if(localStorage.getItem('loginFlag') == 1){
        next();        
      }else{
        next("/");
      }
    },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('../components/AppLayout/admin/AdminDashboard.vue')
      },
      {
        path: 'about',
        name: 'AdminAboutus',
        component: () => import('../components/AppLayout/admin/AdminAboutus.vue')
      },
      {
        path: 'vehicletrackinglive',
        name: 'vehicletrackinglive',
        component: () => import('../components/AppLayout/admin/VehicleTrackingLive.vue')
      },
      {
        path: 'vehicletrackinghistory',
        name: 'vehicletrackinghistory',
        component: () => import('../components/AppLayout/admin/VehicleTrackingHistory.vue')
      }
    ]
  },
	{
		path: '',
		name: 'CompanyLayout',
		component: CompanyLayout,
		children: [
			{
				path: '',
				name: 'Company',
				component: () => import('../components/AppLayout/company/Company.vue')
			}
			
		]
	},	
  {
    path: '/company',
    name: 'CompanyLayout',
    component: CompanyLayout,
    children: [
      {
        path: '',
        name: 'Company',
        component: () => import('../components/AppLayout/company/Company.vue')
      },
      {
        path: 'aboutus',
        name: 'Aboutus',
        component: () => import('../components/AppLayout/company/Aboutus.vue')
      },
      {
        path: 'company',
        name: 'Company',
        component: () => import('../components/AppLayout/company/Company.vue')
      },
      {
        path: 'contact',
        name: 'Contact',
        component: () => import('../components/AppLayout/company/Contact.vue')
      },
      {
        path: 'pricing',
        name: 'Pricing',
        component: () => import('../components/AppLayout/company/Pricing.vue')
      },
      {
        path: 'services',
        name: 'Services',
        component: () => import('../components/AppLayout/company/Services.vue')
      },
      {
        path: 'portfolio',
        name: 'Portfolio',
        component: () => import('../components/AppLayout/company/Portfolio.vue')
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthLayout,
    children:[
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/Login.vue')
      },
      {
        path: '',
        name: 'Login',
        component: () => import('../views/Login.vue')
      },
      {
        path: 'signin',
        name: 'Signin',
        component: () => import('../components/AppLayout/auth/Signin.vue')
      }
    ]
  }
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router



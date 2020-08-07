import Vue from 'vue'
import VueRouter from 'vue-router'
import Beneficiaries from '../views/Beneficiaries.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'beneficiaries',
    component: Beneficiaries
  },
  {
    path: '/beneficiary-create',
    name: 'beneficiary-create',
    props: true,
    component: () => import('../views/BeneficiaryForm'),
  },
  {
    path: '/:beneficiary_id/receipts',
    name: 'receipts',
    component: () => import('../views/Receipts'),
  },
  {
    path: '/:beneficiary_id/receipt-create',
    name: 'receipt-create',
    props: true,
    component: () => import('../views/ReceiptForm'),
  },
  {
    path: '/:beneficiary_id/addresses',
    name: 'addresses',
    component: () => import('../views/Addresses'),
  },
  {
    path: '/:beneficiary_id/address-create',
    name: 'address-create',
    props: true,
    component: () => import('../views/AddressForm'),
  }
]

const router = new VueRouter({
  routes
})

export default router

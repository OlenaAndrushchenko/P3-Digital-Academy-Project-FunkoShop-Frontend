<script setup>
import SidebarLink from './SidebarComponents/SidebarLink.vue'
import logo from '@/assets/img/logos/BlueLogo.svg'
import productsIcon from '@/assets/icons/box-open.svg'
import ordersIcon from '@/assets/icons/shopping-bag.svg'
import salesBillingIcon from '@/assets/icons/euro-sign.svg'
import LogoutButton from './SidebarComponents/LogoutButton.vue'

const sidebarLinks = [
  {
    label: 'Products',
    to: '/admin/products',
    iconPath: productsIcon
  },
  {
    label: 'Orders',
    to: '/admin/orders',
    iconPath: ordersIcon
  },
  {
    label: 'Sales and Billing',
    to: '/admin/sales-billing',
    iconPath: salesBillingIcon
  }
]
</script>

<template>
  <div class="w-[300px] min-h-screen relative">
    <div class="w-full h-full left-0 top-0 absolute bg-white rounded-tr-[20px] rounded-br-[20px] shadow py-16 flex flex-col gap-8">
      <img :src="logo" alt="Logo" class="mx-auto" />

      <div class="flex flex-col gap-5 pl-5 mt-8">
        <ul>
          <SidebarLink
            v-for="(link, index) in sidebarLinks"
            :key="index"
            :label="link.label"
            :to="link.to"
            :iconPath="link.iconPath"
          />
        </ul>

        <hr class="border-t-2 border-dashed border-slate-300 mr-5" />

        <!-- TODO: logout logic by auth store -->
        <LogoutButton />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

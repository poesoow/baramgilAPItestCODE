import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
      path: "/",
      name: "HomePage",
      component: ()=> import('@/page/HomePage') 
    }
  ]
const router = createRouter({
history: createWebHistory(),
  routes
})
export default router;
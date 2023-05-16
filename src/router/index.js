import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
      path: "/",
      name: "HomePage",
      component: ()=> import('@/page/HomePage') 
    },
    {
      path: "/korservice",
      name: "KorService",
      component: () => import('@/page/KorService1')
    },
    {
      path: "/datalab",
      name: "DataLab",
      component: () => import('@/page/DataLabService')
    },
    {
      path: "/durunubi",
      name: "DurunubiService",
      component: () => import('@/page/DurunubiService')
    },
    {
      path: "/korservicewith",
      name: "KorServiceWith",
      component: () => import('@/page/KorServiceWith')
    },
    {
      path: "/greentour",
      name: "GreenTour",
      component: () => import('@/page/GreenTourService')
    },
    {
      path: "/photogallery",
      name: "PhotoGallery",
      component: () => import('@/page/PhotoGalleryService')
    },
  ]
const router = createRouter({
history: createWebHistory(),
  routes
})
export default router;
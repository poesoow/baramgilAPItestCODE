<template>
  <div>
    <ul class="flex gap-3 my-4 max-w-4xl mx-auto">
      <li 
        v-for="(link, index) in routerList" :key="link"
        @click="select = index"
         :class="index == select && 'bg-slate-300'">
        <router-link :to="link.url">{{ link.desc }}</router-link>
      </li>
    </ul>
   
    <router-view :userLoc="userLoc" :paramData="paramData"></router-view>

  </div>
</template>

<script>
import paramData from '@/assets/parameter.json'

export default {
  name: 'App',
  data() {
    return {
      routerList: [
        {url: 'korservice', desc: '국문 관광정보 서비스'}, 
        {url: 'datalab', desc: '관광빅데이터 정보서비스'}, 
        {url: 'durunubi', desc: '두루누비 정보 서비스'}, 
        {url: 'korservicewith', desc: '무장애 여행 정보'}, 
        {url: 'greentour', desc: '생태 관광 정보'}, 
        {url: 'photogallery', desc: '관광 사진 정보'}
      ],
      select: null, 
      userLoc: {},
      paramData: paramData
    }
  },
  methods: {
    getLoc() {
      // https://developer.mozilla.org/ko/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
      if ("geolocation" in navigator) {
        console.log('위치정보 사용 가능')
        navigator.geolocation.getCurrentPosition((position) => {
          this.userLoc = { lat: position.coords.latitude, loc: position.coords.longitude }
        });
      } else {
        console.log('위치정보 사용 불가능')
      }
    }
  },
  mounted() {
    this.getLoc()
  },
}
</script>

<style>

</style>

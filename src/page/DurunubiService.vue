<template>
   <div class="max-w-7xl mx-auto my-5">

    <h2 class="text-3xl">한국관광공사_두루누비 정보 서비스_GW<a class="text-base" href="https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15101974">링크</a></h2>

    <h3 class="my-3">
      <ol class="flex flex-wrap gap-4">
        <li @click="choose(api, i)" v-for="(api, i) in apiLists" :key="api"><span>{{ i + 1 }}. </span>{{ api.desc }}</li>
      </ol>
    </h3>

      <div class="flex gap-3">
        <button @click="fetchData" class="btn-primary">api 데이터 호출</button>
        <button @click="dataList = null" class="btn-primary">닫기</button>
      </div>
      <hr>

      <h3>/{{ selectAPI.api }} : {{ selectAPI.desc }}</h3>
      <div v-if="selectAPIindex == 1">
        <div>gpx 파일로 되어있어서 좀 더 찾아봐야 할 거 같음</div>
        <ul class="flex flex-wrap gap-x-3.5">
          <li v-for="(data, index) in dataList" :key="index" class="basis-full border rounded-md mb-20 relative flex flex-wrap items-center">
            <h3 class="my-3">{{ data.crsKorNm }}</h3>
            <p class="mb-3">{{ data.crsCycle }}</p>
            <p class="mb-3" v-html="data.crsContents"></p>
            <p class="mb-3" v-html="data.crsTourInfo"></p>
            <p class="mb-3"> 경로 파일 {{ gpx(data.gpxpath) }}</p>
            <p class="mb-3">{{ data.travelerinfo }}</p>
          </li>
        </ul>
      </div>


      <div v-if="selectAPIindex == 2">
       <ul class="flex flex-wrap gap-x-3.5">
          <li v-for="(data, index) in dataList" :key="index" class="basis-full border rounded-md mb-20 relative flex flex-wrap items-center">
            <h3 class="my-3">{{ data.themeNm }}</h3>
            <p class="mb-3">{{ data.linemsg }}</p>
            <p class="mb-3" v-html="data.themedescs"></p>
          </li>
        </ul>
      </div>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'DurunubiService',
    data() {
      return {
        baseURL: 'https://apis.data.go.kr/B551011/Durunubi/',
        apiLists: [
          { api: 'courseList', desc: '코스 목록 정보 조회' },
          { api: 'routeList', desc: '길 목록 정보 조회' },
        ],
        selectAPIindex: 0,
        selectAPI: { api: 'courseList', desc: '코스 목록 정보 조회' },
        serviceKey: 'vZqohu%2F1a1mKILW%2BslUEpMtWGBv0IvvlkE7zB28hKgPXkvzNMi9%2F2sawykKToWPc%2F%2FNeUM9rnQykkPu%2FLdPlpQ%3D%3D',
        dataList: null,
        numOfrows: 10, // 한페이지 결과 수
        pageNo: 1, // 페이지 번호
        Mobileos: 'ETC', // OS 구분 : IOS (아이폰), AND (안드로이드), WIN (윈도우폰), ETC(기타)
      }
    },
    methods: {
      choose(api, i) {
      this.selectAPI = api
      this.selectAPIindex = i + 1
      this.dataList = []
    },
    fetchData() {

      const api = this.selectAPI.api

      let endpointGet;

      endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json`)


      console.log('index', this.selectAPIindex)


      endpointGet.then(
        (res) => {
          console.log(res.data.response.body)
          this.dataList = res.data.response.body.items.item
        }
      ).catch((err) => {
        console.log(err)
      })
    }
    },
  }
</script>

<style lang="scss" scoped>

</style>
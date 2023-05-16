<template>
  <div class="max-w-7xl mx-auto my-5">

    <h2 class="text-3xl">한국관광공사_생태 관광 정보_GW<a class="text-base"
        href="https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15101908">링크</a></h2>

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
      <ul>
        <li v-for="(data, index) in dataList" :key="index">
          <div>{{ data }}</div>
        </li>
      </ul>
    </div>


    <div v-if="selectAPIindex == 2">
      <ul>
        <li v-for="(data, index) in dataList" :key="index">
          <div>{{ data }}</div>
        </li>
      </ul>
    </div>

    <div v-if="selectAPIindex == 3">
      <ul>
        <li v-for="(data, index) in dataList" :key="index">
          <div>{{ data }}</div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GreenTour',
  data() {
    return {
      baseURL: 'https://apis.data.go.kr/B551011/GreenTourService1/',
      apiLists: [
        { api: 'areaBasedList1', desc: '지역기반 생태관광정보 조회' },
        { api: 'areaBasedSyncList1', desc: '생태관광정보 동기화 관광정보 조회' },
        { api: 'areaCode1', desc: '지역코드 조회' },
      ],
      selectAPIindex: 0,
      selectAPI: { api: 'areaBasedList1', desc: '지역기반 생태관광정보 조회' },
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

<style lang="scss" scoped></style>
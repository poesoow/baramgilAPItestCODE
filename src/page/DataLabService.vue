<template>
  <div class="max-w-7xl mx-auto my-5">

    <h2 class="text-3xl">한국관광공사_관광빅데이터 정보서비스_ GW<a class="text-base" href="https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15101972#/API%20%EB%AA%A9%EB%A1%9D/metcoRegnVisitrDDList">링크</a></h2>

    <h3 class="my-3">
      <ol class="flex flex-wrap gap-4">
        <li @click="choose(api, i)" v-for="(api, i) in apiLists" :key="api"><span>{{ i + 1 }}. </span>{{ api.desc }}</li>
      </ol>
    </h3>

    <p>시작날짜 / 종료날짜 선택 필수</p>

     <div class="flex gap-3">
        <button @click="fetchData" class="btn-primary">api 데이터 호출</button>
        <button @click="dataList = null" class="btn-primary">닫기</button>
      </div>
      <hr>

      <h3>/{{ selectAPI.api }} : {{ selectAPI.desc }}</h3>
      <div>만약 활용 시 axios로 받아올 때 각 시도별로 새로운 배열을 만들어야 활용하기 용이해 보임</div>

      <div v-if="selectAPIindex == 1">
        <ul>
          <li v-for="(data, index) in dataList" :key="index">
            <h3 class="my-3">{{ data.areaNm }}</h3>
            <p class="mb-3">{{ data.touDivNm }} : {{ data.touNum }}</p>
            <p class="mb-3">기준날짜 {{ data.baseYmd }}</p>
            <p class="mb-3">기준날짜 {{ data.daywkDivNm }}</p>

          </li>
        </ul>
      </div>


      <div v-if="selectAPIindex == 2">
         <ul>
          <li v-for="(data, index) in dataList" :key="index">
            <h3 class="my-3">{{ data.signguNm }}</h3>
            <p class="mb-3">{{ data.touDivNm }} : {{ data.touNum }}</p>
            <p class="mb-3">기준날짜 {{ data.baseYmd }}</p>
            <p class="mb-3">기준날짜 {{ data.daywkDivNm }}</p>
          </li>
        </ul>
      </div>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'DataLab',
    data() {
      return {
        baseURL: 'https://apis.data.go.kr/B551011/DataLabService/',
        apiLists: [
          { api: 'metcoRegnVisitrDDList', desc: '광역 지자체 지역방문자수 집계 데이터 정보 조회' },
          { api: 'locgoRegnVisitrDDList', desc: '기초 지자체 지역방문자수 집계 데이터 정보 조회' },
        ],
        selectAPIindex: 0,
        selectAPI: { api: 'metcoRegnVisitrDDList', desc: '광역 지자체 지역방문자수 집계 데이터 정보 조회' },
        serviceKey: 'vZqohu%2F1a1mKILW%2BslUEpMtWGBv0IvvlkE7zB28hKgPXkvzNMi9%2F2sawykKToWPc%2F%2FNeUM9rnQykkPu%2FLdPlpQ%3D%3D',
        dataList: null,
        numOfrows: 10, // 한페이지 결과 수
        pageNo: 1, // 페이지 번호
        Mobileos: 'ETC', // OS 구분 : IOS (아이폰), AND (안드로이드), WIN (윈도우폰), ETC(기타)
        startYmd: '20220101', // 시작연월일(YYYYMMDD)
        endYmd: '20221230', // 종료연월일(YYYYMMDD)
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

          endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&startYmd=${this.startYmd}&endYmd=${this.endYmd}`)


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
    mounted() {
      // axios.
      // get(`${this.baseURL}metcoRegnVisitrDDList?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&startYmd=${this.startYmd}&endYmd=${this.endYmd}`)
      // // https://apis.data.go.kr/B551011/DataLabService/metcoRegnVisitrDDList?serviceKey=vZqohu%2F1a1mKILW%2BslUEpMtWGBv0IvvlkE7zB28hKgPXkvzNMi9%2F2sawykKToWPc%2F%2FNeUM9rnQykkPu%2FLdPlpQ%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&startYmd=20210513&endYmd=20210513&_type=json
      // .then(
      //   (res) => {
      //     console.log(res)
      //     // this.dataList = res.data.response.body.items.item
      //   }
      // ).catch((err) => {
      //   console.log(err)
      // })
    },
  }
</script>

<style lang="scss" scoped>

</style>
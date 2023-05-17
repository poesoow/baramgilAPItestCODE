<template>
  <div class="max-w-7xl mx-auto my-5">

    <h2 class="text-3xl">한국관광공사_관광사진 정보_GW<a class="text-base"
        href="https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15101914">링크</a></h2>

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
      <div class="pb-24 basis-full flex flex-wrap gap-x-3.5">
        <div v-for="data in dataList" :key="data" class="basis-full border rounded-md mb-20 relative flex flex-wrap items-center group">
          <div class="basis-full md:basis-2/4 group-odd:order-1 md:group-odd:order-1 md:group-even:order-2">
            <img :src="data.galWebImageUrl" :alt="data.galTitle" class="w-full p-2.5 h-[350px]">
          </div>
          <div class="basis-full md:basis-2/4 md:group-even:left-14 md:group-odd:-left-14 group-odd:order-2 group-even:text-right group-even:order-1 relative z-10 px-7 sm:px-16 py-5 box-border">
            <h3 class="py-5 font-bold">{{ data.galTitle }}</h3>
            <p class="pb-3">사진사 : {{ data.galPhotographer }}</p>
            <p class="pb-3">날짜 : {{ data.galPhotographyMonth }}</p>
            <p class="pb-3">키워드 : {{ data.galSearchKeyword }}</p>
          </div>
        </div>
      </div>
    </div>


    <div v-if="selectAPIindex == 2">
      <p>한글은 인코딩 필요 영어로 test 할만한거를 못찾음</p>
      <div class="pb-24 basis-full flex flex-wrap gap-x-3.5">
        <div v-for="data in dataList" :key="data" class="basis-full border rounded-md mb-20 relative flex flex-wrap items-center group">
          <div class="basis-full md:basis-2/4 group-odd:order-1 md:group-odd:order-1 md:group-even:order-2">
            <img :src="data.galWebImageUrl" :alt="data.galTitle" class="w-full p-2.5 h-[350px]">
          </div>
          <div class="basis-full md:basis-2/4 md:group-even:left-14 md:group-odd:-left-14 group-odd:order-2 group-even:text-right group-even:order-1 relative z-10 px-7 sm:px-16 py-5 box-border">
            <h3 class="py-5 font-bold">{{ data.galTitle }}</h3>
            <p class="pb-3">사진사 : {{ data.galPhotographer }}</p>
            <p class="pb-3">날짜 : {{ data.galPhotographyMonth }}</p>
            <p class="pb-3">키워드 : {{ data.galSearchKeyword }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectAPIindex == 3">
       <div class="pb-24 basis-full flex flex-wrap gap-x-3.5">
            <div v-for="data in dataList" :key="data" class="basis-full border rounded-md mb-20 relative flex flex-wrap items-center group">
              <div class="basis-full md:basis-2/4 group-odd:order-1 md:group-odd:order-1 md:group-even:order-2">
                <img :src="data.galWebImageUrl" :alt="data.galTitle" class="w-full p-2.5 h-[350px]">
              </div>
              <div class="basis-full md:basis-2/4 md:group-even:left-14 md:group-odd:-left-14 group-odd:order-2 group-even:text-right group-even:order-1 relative z-10 px-7 sm:px-16 py-5 box-border">
                <h3 class="py-5 font-bold">{{ data.galTitle }}</h3>
                <p class="pb-3">사진사 : {{ data.galPhotographer }}</p>
                <p class="pb-3">날짜 : {{ data.galPhotographyMonth }}</p>
                <p class="pb-3">키워드 : {{ data.galSearchKeyword }}</p>
              </div>
            </div>
          </div>
    </div>

    <div v-if="selectAPIindex == 4">
       <div class="pb-24 basis-full flex flex-wrap gap-x-3.5">
          <div v-for="data in dataList" :key="data" class="basis-full border rounded-md mb-20 relative flex flex-wrap items-center group">
            <div class="basis-full md:basis-2/4 group-odd:order-1 md:group-odd:order-1 md:group-even:order-2">
              <img :src="data.galWebImageUrl" :alt="data.galTitle" class="w-full p-2.5 h-[350px]">
            </div>
            <div class="basis-full md:basis-2/4 md:group-even:left-14 md:group-odd:-left-14 group-odd:order-2 group-even:text-right group-even:order-1 relative z-10 px-7 sm:px-16 py-5 box-border">
              <h3 class="py-5 font-bold">{{ data.galTitle }}</h3>
              <p class="pb-3">사진사 : {{ data.galPhotographer }}</p>
              <p class="pb-3">날짜 : {{ data.galPhotographyMonth }}</p>
              <p class="pb-3">키워드 : {{ data.galSearchKeyword }}</p>
            </div>
          </div>
        </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PhotoGallery',
  data() {
    return {
      baseURL: 'https://apis.data.go.kr/B551011/PhotoGalleryService1/',
      apiLists: [
        { api: 'galleryList1', desc: '관광사진갤러리 목록 조회' },
        { api: 'galleryDetailList1', desc: '관광사진갤러리 상세 목록 조회' },
        { api: 'gallerySyncDetailList1', desc: '관광사진갤러리 동기화 목록 조회' },
        { api: 'gallerySearchList1', desc: '관광사진갤러리 키워드 검색 목록 조회' },
      ],
      selectAPIindex: 0,
      selectAPI:  { api: 'galleryList1', desc: '관광사진갤러리 목록 조회' },
      serviceKey: 'vZqohu%2F1a1mKILW%2BslUEpMtWGBv0IvvlkE7zB28hKgPXkvzNMi9%2F2sawykKToWPc%2F%2FNeUM9rnQykkPu%2FLdPlpQ%3D%3D',
      dataList: null,
      numOfrows: 10, // 한페이지 결과 수
      pageNo: 1, // 페이지 번호
      Mobileos: 'ETC', // OS 구분 : IOS (아이폰), AND (안드로이드), WIN (윈도우폰), ETC(기타)
      /* 관광사진갤러리 상세 목록 조회 */
      title: '홍보', // 요청 키워드(한글 경우, URL 인코딩 필요)
      /* 관광사진갤러리 키워드 검색 목록 조회 */
      keyword: '여수' // 요청 키워드(한글 경우, URL 인코딩 필요)
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

      if((this.selectAPI.api == 'galleryList1') || (this.selectAPI.api == 'gallerySyncDetailList1')) {
        endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json`)
      } else if (this.selectAPI.api == 'galleryDetailList1') {
        endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&title=${encodeURI(this.title)}`)
      } else if (this.selectAPI.api == 'gallerySearchList1') {
        endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&keyword=${encodeURI(this.keyword)}`)
      }


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
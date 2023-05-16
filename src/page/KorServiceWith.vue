<template>
  <div class="max-w-7xl mx-auto my-5">

    <h2 class="text-3xl">한국관광공사_무장애 여행 정보_GW<a class="text-base"
        href="https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15101897">링크</a>
        <p class="my-2 text-base">국민복지관광 서비스(취학계층의 장애요인 해소) -장애인,어르신,영유아를 동반한 여행의 어려움 해소를 위한 관광정보 제공 서비스 국민복지관광 서비스(취학계층의 장애요인 해소) -장애인,어르신,영유아를 동반한 여행의 어려움 해소를 위한 관광정보 제공 서비스</p>
    </h2>
    <!-- URL 선택 -->
    <h3 class="my-3">
      <ol class="flex flex-wrap gap-4">
        <li @click="choose(api, i)" v-for="(api, i) in apiLists" :key="api"><span>{{ i + 1 }}. </span>{{ api.desc }}</li>
      </ol>
    </h3>


    <!-- 위치기반 관광정보조희 -->
    <div class="my-3 flex">
      <div class="flex">
        <label for="numOfrows" class="btn-primary hover:bg-green-700">페이지 당 결과 수</label>
        <select v-model="numOfrows" id="numOfrows" class="mx-3 border rounded py-1">
          <option v-for="i in 20" :key="i">{{ i }}</option>
        </select>
      </div>

      <div class="flex">
        <label for="arrange" class="btn-primary hover:bg-green-700">정렬구분</label>
        <select v-model="arrange" id="arrange" class="mx-3 border rounded py-1">
          <optgroup label="전체정렬">
            <option value="A">제목순</option>
            <option value="C">수정일순</option>
            <option value="D">생성일순</option>
          </optgroup>
          <optgroup label="대표이미지가 반드시 있는 정렬">
            <option value="O">제목순</option>
            <option value="Q">수정일순</option>
            <option value="R">생성일순</option>
          </optgroup>
        </select>
      </div>
      <div v-if="(selectAPIindex != 3) && (selectAPIindex != 4)" class="flex">
        <label for="contentTypeId" class="btn-primary hover:bg-green-700">관광타입</label>
        <select v-model="contentTypeId" id="contentTypeId" class="mx-3 border rounded py-1">
          <option value="12">관광지</option>
          <option value="14">문화시설</option>
          <option value="15">축제공연행사</option>
          <option value="25">여행코스</option>
          <option value="28">레포츠</option>
          <option value="32">숙박</option>
          <option value="38">쇼핑</option>
          <option value="39">음식점</option>
        </select>
      </div>

      <div v-if="this.selectAPI.api == 'locationBasedList1'" class="flex">
        <!-- 현재 위치 GPS 값 가져오는 기능 찾아서 넣어야 함 -->
        <label for="radius" class="btn-primary hover:bg-green-700">거리반경 : {{ radius }}미터</label>
        <input v-model="radius" id="radius" type="range" min="100" max="20000" class="mx-3 border rounded py-1">
      </div>

      <div v-else-if="this.selectAPI.api == 'searchKeyword1'" class="flex">
        <label for="keyword" class="btn-primary hover:bg-green-700">검색 </label>
        <input v-model="keyword" id="keyword" type="text" class="mx-3 border rounded py-1 block">
      </div>

      <div v-else-if="this.selectAPI.api == 'searchFestival1'" class="flex">
        <label for="eventStartDate" class="btn-primary hover:bg-green-700">행사시작일 (YYYYMMDD)</label>
        <input v-model.number="eventStartDate" id="eventStartDate" type="text" class="mx-3 border rounded py-1 block">
      </div>


    </div>
    <div class="flex gap-3">
      <button @click="fetchData" class="btn-primary">api 데이터 호출</button>
      <button @click="dataList = null" class="btn-primary">닫기</button>
    </div>
    <hr>

    <h3>/{{ selectAPI.api }} : {{ selectAPI.desc }}</h3>
    <div v-if="this.selectAPI.api == 'locationBasedList1'">
      <ul>
        <li v-for="(data, index) in dataList" :key="index">
          <div>{{ data.title }}</div>
          <img :src="data.firstimage" alt="">
          <img :src="data.firstimage2" alt="">
        </li>
      </ul>
    </div>

    <div v-if="this.selectAPI.api == 'searchKeyword1'">
      <div>한글은 인코딩 필요</div>
      <ul>
        <li v-for="(data, index) in dataList" :key="index">
          {{ data }}
        </li>
      </ul>
    </div>

    <div v-if="this.selectAPI.api == 'searchFestival1'">
      <ul>
        <li v-for="(data, index) in dataList" :key="index">
          <div>{{ data.title }}</div>
          <img :src="data.firstimage" alt="">
          <img :src="data.firstimage2" alt="">
        </li>
      </ul>
    </div>

    <div v-if="this.selectAPI.api == 'searchStay1'">
      <ul>
        <li v-for="(data, index) in dataList" :key="index">
          <div>{{ data.title }}</div>
          <img :src="data.firstimage" alt="">
          <img :src="data.firstimage2" alt="">
        </li>
      </ul>
    </div>

    <div v-if="this.selectAPI.api == 'detailCommon1'">
      타입별공통 정보기본정보,약도이미지,대표이미지,분류정보,지역정보,주소정보,좌표정보,개요정보,길안내정보,이미지정보,연계관광정보목록을 조회하는 기능 <br>
      이라고 하는데 정확한 사용법은 더 찾아봐야 알거 같음
      <ul>
        <li v-for="(data, index) in dataList" :key="index">
          {{ data }}
        </li>
      </ul>
    </div>

    <div v-if="this.selectAPI.api == 'detailIntro1'">
      <ul>
        <li v-for="(data, index) in dataList" :key="index">
          {{ data }}
        </li>
      </ul>
    </div>

    <div v-if="this.selectAPI.api == 'detailInfo1'">
      생략
    </div>

    <div v-if="this.selectAPI.api == 'detailImage1'">
      생략
    </div>

    <div v-if="this.selectAPI.api == 'areaBasedSyncList1'">
      <ul>
        <li v-for="(data, index) in dataList" :key="index">
          {{ data }}
          <img :src="data.firstimage" alt="">
        </li>
      </ul>
    </div>

    <div
      v-if="(this.selectAPI.api == 'areaCode1') || (this.selectAPI.api == 'detailPetTour1') || (this.selectAPI.api == 'categoryCode1') || (this.selectAPI.api == 'areaBasedList1')">
      <ul>
        <li v-for="(data, index) in dataList" :key="index">
          {{ data }}
        </li>
      </ul>
    </div>

    <div v-if="this.selectAPI.api == 'detailWithTour1'">
      <ul>
        <li v-for="(data, index) in dataList" :key="index">
          {{ data }}
        </li>
      </ul>
    </div>


  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'KorServiceWith',
  data() {
    return {
      baseURL: 'https://apis.data.go.kr/B551011/KorWithService1/',
      apiLists: [
        { api: 'areaCode1', desc: '지역코드조회' }, // 상세 검색을 위해서 필요
        { api: 'categoryCode1', desc: '서비스분류코드' }, // 상세 검색을 위해서 필요
        { api: 'areaBasedList1', desc: '지역기반 관광정보조회' },
        { api: 'locationBasedList1', desc: '위치기반 관광정보조회' },
        { api: 'searchKeyword1', desc: '키워드 검색 조회' },
        { api: 'detailCommon1', desc: '공통정보조회' }, // contentId 필요
        { api: 'detailIntro1', desc: '소개정보조회' }, // contentId 필요
        { api: 'detailInfo1', desc: '반복정보조회' }, // 생략
        { api: 'detailImage1', desc: '이미지정보조회' }, // 생략
        { api: 'detailWithTour1', desc: '무장애정보조회' },
        { api: 'areaBasedSyncList1', desc: '무장애 여행정보 동기화 목록 조회' },
      ],
      selectAPIindex: 0,
      selectAPI: { api: 'locationBasedList1', desc: '위치기반 관광정보조희' },
      serviceKey: 'vZqohu%2F1a1mKILW%2BslUEpMtWGBv0IvvlkE7zB28hKgPXkvzNMi9%2F2sawykKToWPc%2F%2FNeUM9rnQykkPu%2FLdPlpQ%3D%3D',
      dataList: null,
      numOfrows: 10, // 한페이지 결과 수
      pageNo: 1, // 페이지 번호
      Mobileos: 'ETC', // OS 구분 : IOS (아이폰), AND (안드로이드), WIN (윈도우폰), ETC(기타)
      listYN: 'Y', // 목록구분(Y=목록, N=개수)
      arrange: 'A', // 정렬구분 (A=제목순, C=수정일순, D=생성일순) 대표이미지가반드시있는정렬(O=제목순, Q=수정일순, R=생성일순)
      contentTypeId: '12', // 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점)
      /* 위치기반 관광정보조회 */
      mapX: '126.981611', // GPS X좌표(WGS84 경도좌표)
      mapY: '37.568477', // GPS X좌표(WGS84 위도좌표)
      radius: '1000', // 거리반경(단위:m) , Max값 20000m=20Km
      /* 키워드 검색 조회 */
      keyword: 'play', // 검색요청할키워드 : (국문=인코딩필요)
      areaCode: '', // 지역코드 (현재 사용 X 지역코드 외 시군구코드, 대중소분류 등 더욱 상세히 검색 조건 가능 사용확정 시 추가적으로 알아보기 필요)
      /* 행사정보조회 */
      eventStartDate: 20200101, // 행사시작일(형식 :YYYYMMDD) 필수
      eventEndDate: '', // 행사종료일(형식 :YYYYMMDD)
      /* 공통정보조회 */
      contentId: '1604784', // 콘텐츠 아이디
      defaultYN: 'N', // 기본정보조회여부( Y,N )
      firstImageYN: 'Y', // 원본, 썸네일대표 이미지, 이미지 공공누리유형정보 조회여부( Y,N )
      /* 소개정보조회 */
      contentTypeid: '12', // 소문자 주의 필수값이라서
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

      if (this.selectAPI.api == 'locationBasedList1') {
        endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&listYN=${this.listYN}&arrange=${this.arrange}&mapX=${this.mapX}&mapY=${this.mapY}&radius=${this.radius}&contentTypeId=${this.contentTypeId}`)
      } else if (this.selectAPI.api == 'searchKeyword1') {
        endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&listYN=${this.listYN}&arrange=${this.arrange}&contentTypeId=${this.contentTypeId}&keyword=${this.keyword}`)
      } else if (this.selectAPI.api == 'searchFestival1') {
        endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&listYN=${this.listYN}&arrange=${this.arrange}&eventStartDate=${this.eventStartDate}`)
      } else if (this.selectAPI.api == 'searchStay1') {
        endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&listYN=${this.listYN}&arrange=${this.arrange}`)
      } else if (this.selectAPI.api == 'detailCommon1') {
        endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&contentId=${this.contentId}`)
      } else if (this.selectAPI.api == 'detailIntro1') {
        endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&contentId=${this.contentId}&contentTypeId=${this.contentTypeid}`)
      } else if (this.selectAPI.api == 'detailInfo1') {
        console.log('생략')
      } else if (this.selectAPI.api == 'detailImage1') {
        console.log('생략')
      } else if ((this.selectAPI.api == 'areaBasedSyncList1') || (this.selectAPI.api == 'areaCode1') || (this.selectAPI.api == 'detailPetTour1') || (this.selectAPI.api == 'categoryCode1') || (this.selectAPI.api == 'areaBasedList1')) {
        endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json`)
      } else if (this.selectAPI.api == 'detailWithTour1') {
        endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&contentId=${this.contentId}`)
      }


      console.log('api', this.selectAPI.api)

      if ((this.selectAPI.api == 'detailInfo1') || (this.selectAPI.api == 'detailImage1')) {
        return false
      } else {
        endpointGet.then(
          (res) => {
            console.log(res.data.response.body)
            this.dataList = res.data.response.body.items.item
          }
        ).catch((err) => {
          console.log(err)
        })
      }
    }
  },
  mounted() {
    // axios.
    // get(`${this.baseURL}detailWithTour1?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&&contentId=${this.contentId}`)
    // .then(
    //   (res)=>{
    //     console.log(res)
    //     // this.dataList = res.data.response.body.items.item
    //   }
    // ).catch((err)=>{
    //   console.log(err)
    // })
  },

}
</script>

<style lang="scss" scoped></style>
<template>
  <div class="max-w-7xl mx-auto my-5">
    <h2 class="text-3xl">한국관광공사_국문 관광정보 서비스_GW<a class="text-base" href="https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15101578#/API%20%EB%AA%A9%EB%A1%9D/locationBasedList1">링크</a></h2>
    <!-- URL 선택 -->
    <h3 class="my-3">
      <ol class="flex flex-wrap gap-4 border">
        <li @click="choose(api, i)" v-for="(api, i) in apiLists" :key="api"><span>{{ i + 1 }}. </span>{{ api.desc }}</li>
      </ol>
    </h3>


    <!-- 위치기반 관광정보조희 -->
    <div class="my-3 flex-col">
      <div class="flex">
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
      
        <div v-else-if="this.selectAPI.api == 'categoryCode1'" class="flex">
          <label for="cateType" class="btn-primary hover:bg-green-700">서비스 분류</label>
          <select v-model="cateType" id="cateType" class="mx-3 border rounded py-1">
            <option value="A01">자연</option>
            <option value="A02">인문(문화/예술/역사)</option>
            <option value="A03">레포츠</option>
            <option value="A04">쇼핑</option>
            <option value="A05">음식</option>
            <option value="B02">숙박</option>
            <option value="C01">추천코스</option>
          </select>
        </div>
      
      </div>

      <!-- <div class="my-3 flex gap-3">
        <h2 class="font-bold text-1xl">필수 parameter</h2>
        <ul>
          <li><div>MobileOS (OS 구분 : IOS (아이폰), AND (안드로이드), WIN (윈도우폰), ETC(기타))</div></li>
          <li><div>MobileApp 서비스명(어플명)</div></li>
          <li><div>mapX GPS X좌표(WGS84 경도좌표)</div></li>
          <li><div>mapY GPS Y좌표(WGS84 위도좌표)</div></li>
          <li><div>radius 거리반경(단위:m) , Max값 20000m=20Km</div></li>
        </ul>
        <h2 class="font-bold text-1xl">옵션 parmameter (모든 가능한 parmameter는 링크타고 들어가서 보기)</h2>
        <ul>
          <li>listYN 목록구분(Y=목록, N=개수)</li>
          <li>arrange 정렬구분 (A=제목순, C=수정일순, D=생성일순) 대표이미지가반드시있는정렬(O=제목순, Q=수정일순, R=생성일순)</li>
          <li>contentTypeId 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID</li>
          <li>modifiedtime 수정일(형식 :YYYYMMDD)</li>
        </ul>
      </div> -->

    </div>


    <div class="flex gap-3">
      <button @click="fetchData" class="btn-primary">api 데이터 호출</button>
      <button @click="dataList = null" class="btn-primary">닫기</button>
    </div>
    <hr>

    <h3 class="font-bold ">선택: /{{ selectAPI.api }} : {{ selectAPI.desc }}</h3>

    <div v-if="this.selectAPI.api == 'locationBasedList1'">
      <div class="pb-24 basis-full flex flex-wrap gap-x-3.5">
        <div v-for="data in dataList" :key="data" class="basis-full border rounded-md mb-20 relative flex flex-wrap items-center group">
          <div class="basis-full md:basis-2/4 group-odd:order-1 md:group-odd:order-1 md:group-even:order-2">
            <img :src="data.firstimage" :alt="data.title" class="w-full p-2.5 h-[350px]">
          </div>
          <div class="basis-full md:basis-2/4 md:group-even:left-14 md:group-odd:-left-14 group-odd:order-2 group-even:text-right group-even:order-1 relative z-10 px-7 sm:px-16 py-5 box-border">
            <h3 class="py-5 font-bold">{{ data.title }}</h3>
            <p class="pb-3">{{ data.addr1 }}<span>{{ data.addr2 }}</span></p>
            <p class="pb-3">저작권 표시 : {{ data.cpyrhtDivCd == 'Type1' ? '제1유형(출처표시-권장)' : (data.cpyrhtDivCd == 'Type3' ? '제3유형(출처표시-권장+변경금지)' : '값 표시 없음') }}</p>
            <p class="pb-3">콘텐츠ID : {{ data.contentid }}</p>
            <p class="pb-3">콘텐츠타입ID : {{ data.contenttypeid }}</p>
            <p class="pb-3">거리 : {{ data.dist }}</p>
            <p class="pb-3">GPS 좌표 <span>{{ data.mapx }}</span>/<span>{{ data.mapy }}</span> </p>
            <p class="pb-3">시군구 코드 {{ data.sigungucode }}</p>
            <p class="pb-3">전화번호 : {{ data.tel }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="this.selectAPI.api == 'searchKeyword1'">
      <div>한글 입력 가능(주소등은 검색 안되고 title을 검색하는 것을 보임)</div>
      <div v-if="bodyInfo">검색 결과 수 : {{ bodyInfo.totalCount }}</div>
      <div class="pb-24 basis-full flex flex-wrap gap-x-3.5">
        <div v-for="data in dataList" :key="data" class="basis-full border rounded-md mb-20 relative flex flex-wrap items-center group">
          <div class="basis-full md:basis-2/4 group-odd:order-1 md:group-odd:order-1 md:group-even:order-2">
            <img :src="data.firstimage" :alt="data.title" class="w-full p-2.5 h-[350px]">
          </div>
          <div class="basis-full md:basis-2/4 md:group-even:left-14 md:group-odd:-left-14 group-odd:order-2 group-even:text-right group-even:order-1 relative z-10 px-7 sm:px-16 py-5 box-border">
            <h3 class="py-5 font-bold">{{ data.title }}</h3>
            <p class="pb-3">{{ data.addr1 }}<span>{{ data.addr2 }}</span></p>
            <p class="pb-3">저작권 표시 : {{ data.cpyrhtDivCd == 'Type1' ? '제1유형(출처표시-권장)' : (data.cpyrhtDivCd == 'Type3' ? '제3유형(출처표시-권장+변경금지)' : '값 표시 없음') }}</p>
            <p class="pb-3">콘텐츠ID : {{ data.contentid }}</p>
            <p class="pb-3">콘텐츠타입ID : {{ data.contenttypeid }}</p>
            <p class="pb-3">GPS 좌표 <span>{{ data.mapx }}</span>/<span>{{ data.mapy }}</span> </p>
            <p class="pb-3">시군구 코드 {{ data.sigungucode }}</p>
            <p class="pb-3">전화번호 : {{ data.tel }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="this.selectAPI.api == 'searchFestival1'">
      <div>행사정보목록을 조회 컨텐츠 타입이 ‘행사’일 경우에만 유효하다</div>
      <div class="pb-24 basis-full flex flex-wrap gap-x-3.5">
        <div v-for="data in dataList" :key="data" class="basis-full border rounded-md mb-20 relative flex flex-wrap items-center group">
          <div class="basis-full md:basis-2/4 group-odd:order-1 md:group-odd:order-1 md:group-even:order-2">
            <img :src="data.firstimage" :alt="data.title" class="w-full p-2.5 h-[350px]">
          </div>
          <div class="basis-full md:basis-2/4 md:group-even:left-14 md:group-odd:-left-14 group-odd:order-2 group-even:text-right group-even:order-1 relative z-10 px-7 sm:px-16 py-5 box-border">
            <h3 class="py-5 font-bold">{{ data.title }}</h3>
            <p class="pb-3">{{ data.addr1 }}<span>{{ data.addr2 }}</span></p>
            <p><span>시작 날짜 {{ data.eventstartdate }}</span> <span>종료 날짜 {{ data.eventenddate }}</span></p>
            <p class="pb-3">저작권 표시 : {{ data.cpyrhtDivCd == 'Type1' ? '제1유형(출처표시-권장)' : (data.cpyrhtDivCd == 'Type3' ? '제3유형(출처표시-권장+변경금지)' : '값 표시 없음') }}</p>
            <p class="pb-3">콘텐츠ID : {{ data.contentid }}</p>
            <p class="pb-3">콘텐츠타입ID : {{ data.contenttypeid }}</p>
            <p class="pb-3">GPS 좌표 <span>{{ data.mapx }}</span>/<span>{{ data.mapy }}</span> </p>
            <p class="pb-3">시군구 코드 {{ data.sigungucode }}</p>
            <p class="pb-3">지역 코드 {{ data.areacode }}</p>
            <p class="pb-3">전화번호 : {{ data.tel }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="this.selectAPI.api == 'searchStay1'">
      <div>행사정보목록을 조회 컨텐츠 타입이 ‘숙박’일 경우에만 유효하다</div>
      <div class="pb-24 basis-full flex flex-wrap gap-x-3.5">
        <div v-for="data in dataList" :key="data" class="basis-full border rounded-md mb-20 relative flex flex-wrap items-center group">
          <div class="basis-full md:basis-2/4 group-odd:order-1 md:group-odd:order-1 md:group-even:order-2">
            <img :src="data.firstimage" :alt="data.title" class="w-full p-2.5 h-[350px]">
          </div>
           <div class="basis-full md:basis-2/4 md:group-even:left-14 md:group-odd:-left-14 group-odd:order-2 group-even:text-right group-even:order-1 relative z-10 px-7 sm:px-16 py-5 box-border">
            <h3 class="py-5 font-bold">{{ data.title }}</h3>
            <p class="pb-3">{{ data.addr1 }}<span>{{ data.addr2 }}</span></p>
            <p class="pb-3">저작권 표시 : {{ data.cpyrhtDivCd == 'Type1' ? '제1유형(출처표시-권장)' : (data.cpyrhtDivCd == 'Type3' ? '제3유형(출처표시-권장+변경금지)' : '값 표시 없음') }}</p>
            <p class="pb-3">콘텐츠ID : {{ data.contentid }}</p>
            <p class="pb-3">콘텐츠타입ID : {{ data.contenttypeid }}</p>
            <p class="pb-3">GPS 좌표 <span>{{ data.mapx }}</span>/<span>{{ data.mapy }}</span> </p>
            <p class="pb-3">시군구 코드 {{ data.sigungucode }}</p>
            <p class="pb-3">지역 코드 {{ data.areacode }}</p>
            <p class="pb-3">전화번호 : {{ data.tel }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="this.selectAPI.api == 'detailCommon1'">
      콘텐츠 아이디 입력 시 해당 홈페이지 내용등을 확인 가능
      <div class="pb-24 basis-full flex flex-wrap gap-x-3.5">
        <div v-for="data in dataList" :key="data" class="basis-full border rounded-md mb-20 relative flex flex-wrap items-center group">
          <div class="basis-full md:basis-2/4 group-odd:order-1 md:group-odd:order-1 md:group-even:order-2">
            <img :src="data.firstimage" :alt="data.title" class="w-full p-2.5 h-[350px]">
          </div>
            <div class="basis-full md:basis-2/4 md:group-even:left-14 md:group-odd:-left-14 group-odd:order-2 group-even:text-right group-even:order-1 relative z-10 px-7 sm:px-16 py-5 box-border">
            <h3 class="py-5 font-bold">{{ data.title }}</h3>
            <p class="pb-3">{{ data.addr1 }}<span>{{ data.addr2 }}</span></p>
            <p class="pb-3">저작권 표시 : {{ data.cpyrhtDivCd == 'Type1' ? '제1유형(출처표시-권장)' : (data.cpyrhtDivCd == 'Type3' ? '제3유형(출처표시-권장+변경금지)' : '값 표시 없음') }}</p>
            <p class="pb-3">콘텐츠ID : {{ data.contentid }}</p>
            <p class="pb-3">콘텐츠타입ID : {{ data.contenttypeid }}</p>
            <p class="pb-3">GPS 좌표 <span>{{ data.mapx }}</span>/<span>{{ data.mapy }}</span> </p>
            <p class="pb-3">시군구 코드 {{ data.sigungucode }}</p>
            <p class="pb-3">지역 코드 {{ data.areacode }}</p>
            <p class="pb-3">전화번호 : {{ data.tel }}</p>
            <p class="pb-3" v-html="data.homepage"></p>
            <p class="pb-3" v-html="data.overview"></p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="this.selectAPI.api == 'detailIntro1'">
      콘텐츠 아이디 입력 시 주차정보 등 추가 적인 정보 제공
      <div class="pb-24 basis-full flex flex-wrap gap-x-3.5">
        <div v-for="data in dataList" :key="data" class="basis-full border rounded-md mb-20 relative flex flex-wrap items-center group">
          <div class="basis-full md:basis-2/4 md:group-even:left-14 md:group-odd:-left-14 group-odd:order-2 group-even:text-right group-even:order-1 relative z-10 px-7 sm:px-16 py-5 box-border">
            <h3 class="py-5 font-bold">{{ data.title }}</h3>
            <p class="pb-3">콘텐츠ID : {{ data.contentid }}</p>
            <p class="pb-3">콘텐츠타입ID : {{ data.contenttypeid }}</p>
            <p class="pb-3">전화번호 : {{ data.infocenter }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="this.selectAPI.api == 'detailInfo1'">
      <div>선택한 데이터안에 반복되는 정보가 있는 경우 사용 </div>
      <div class="pb-24 basis-full flex flex-wrap gap-x-3.5">
        <div v-for="data in dataList" :key="data" class="basis-full border rounded-md mb-20 relative flex flex-wrap items-center">
          <div class="basis-full md:basis-2/4 relative z-10 px-7 sm:px-16 py-5 box-border">
          <h3 class="py-5 font-bold">{{ data.infoname }}</h3>
          <p class="pb-3" v-html="data.infotext"></p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="this.selectAPI.api == 'detailImage1'">
      <div class="pb-24 basis-full flex flex-wrap gap-x-3.5">
        <div v-for="data in dataList" :key="data" class="basis-full border rounded-md mb-20 relative flex flex-wrap items-center group">
          <div class="basis-full md:basis-2/4 group-odd:order-1 md:group-odd:order-1 md:group-even:order-2">
            <img :src="data.originimgurl" :alt="data.title" class="w-full p-2.5 h-[350px]">
          </div>
            <div class="basis-full md:basis-2/4 md:group-even:left-14 md:group-odd:-left-14 group-odd:order-2 group-even:text-right group-even:order-1 relative z-10 px-7 sm:px-16 py-5 box-border">
            <h3 class="py-5 font-bold">{{ data.imgname }}</h3>
          </div>
        </div>
      </div>
    </div>

    <div v-if="(this.selectAPI.api == 'areaBasedSyncList1') || (this.selectAPI.api == 'areaBasedList1')">
      <div v-if="(this.selectAPI.api == 'areaBasedSyncList1')" >
        지역을 선택할 수 있게함 1.위치기반은 현재 사용자 위치기준 9관광정보 동기화는 시군구를 선택가능 현재 서울
        <p>13번하고는 차이점을 모르겠음...</p>
      </div>
      <div class="pb-24 basis-full flex flex-wrap gap-x-3.5">
        <div v-for="data in dataList" :key="data" class="basis-full border rounded-md mb-20 relative flex flex-wrap items-center group">
          <div class="basis-full md:basis-2/4 group-odd:order-1 md:group-odd:order-1 md:group-even:order-2">
            <img :src="data.firstimage" :alt="data.title" class="w-full p-2.5 h-[350px]">
          </div>
          <div class="basis-full md:basis-2/4 md:group-even:left-14 md:group-odd:-left-14 group-odd:order-2 group-even:text-right group-even:order-1 relative z-10 px-7 sm:px-16 py-5 box-border">
            <h3 class="py-5 font-bold">{{ data.title }}</h3>
            <p class="pb-3">{{ data.addr1 }}<span>{{ data.addr2 }}</span></p>
            <p class="pb-3">저작권 표시 : {{ data.cpyrhtDivCd == 'Type1' ? '제1유형(출처표시-권장)' : (data.cpyrhtDivCd == 'Type3' ? '제3유형(출처표시-권장+변경금지)' : '값 표시 없음') }}</p>
            <p class="pb-3">콘텐츠ID : {{ data.contentid }}</p>
            <p class="pb-3">콘텐츠타입ID : {{ data.contenttypeid }}</p>
            <p class="pb-3">GPS 좌표 <span>{{ data.mapx }}</span>/<span>{{ data.mapy }}</span> </p>
            <p class="pb-3">시군구 코드 {{ data.sigungucode }}</p>
            <p class="pb-3">전화번호 : {{ data.tel }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="(this.selectAPI.api == 'areaCode1')">
      <div>코드를 기본값은 00시에 대한 코드 현재는 서울시에 대한 구코드</div>
      <ul>
        <li v-for="(data, index) in dataList" :key="index">
          {{ data }}
        </li>
      </ul>
    </div>

    <div v-if="this.selectAPI.api == 'detailPetTour1'">
      <div>콘텐츠 아이디 하나만 입력시 해당 정보에 대해서만 기본값은 전체</div>
      <div class="pb-24 basis-full flex flex-wrap gap-x-3.5">
        <div v-for="data in dataList" :key="data" class="basis-full border rounded-md mb-20 relative flex flex-wrap items-center">
          <div class="basis-full md:basis-2/4 relative z-10 px-7 sm:px-16 py-5 box-border">
            <p class="pb-3">콘텐츠ID : {{ data.contentid }}</p>
            <p class="pb-3">{{ data.acmpyNeedMtr }}</p>
            <p class="pb-3">{{ data.acmpyTypeCd }}</p>
            <p class="pb-3">{{ data.etcAcmpyInfo }}</p>
            <p class="pb-3">{{ data.relaFrnshPrdlst }}</p>
            <p class="pb-3">{{ data.relaPosesFclty }}</p>
            <p class="pb-3">{{ data.acmpyPsblCpam }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="(this.selectAPI.api == 'categoryCode1')">
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
    name: 'KorService',
    props: {
      userLoc: Object,
      paramData: Object
    },
    data() {
      return {
        baseURL: 'https://apis.data.go.kr/B551011/KorService1/',
        apiLists: [
          { api: 'locationBasedList1', desc: '위치기반 관광정보조회' },
          { api: 'searchKeyword1', desc: '키워드 검색 조회' },
          { api: 'searchFestival1', desc: '행사정보조회' },
          { api: 'searchStay1', desc: '숙박정보조회' },
          { api: 'detailCommon1', desc: '공통정보조회' }, // contentId 필요
          { api: 'detailIntro1', desc: '소개정보조회' }, // contentId 필요
          { api: 'detailInfo1', desc: '반복정보조회' }, // 생략
          { api: 'detailImage1', desc: '이미지정보조회' }, // 생략
          { api: 'areaBasedSyncList1', desc: '관광정보 동기화 목록 조회' },
          { api: 'areaCode1', desc: '지역코드조회' }, // 상세 검색을 위해서 필요
          { api: 'detailPetTour1', desc: '반려동물 동반 여행 정보' }, 
          { api: 'categoryCode1', desc: '서비스분류코드' }, // 상세 검색을 위해서 필요
          { api: 'areaBasedList1', desc: '지역기반 관광정보조회' },
        ],
        selectAPIindex: 0,
        selectAPI: { api: 'locationBasedList1', desc: '위치기반 관광정보조희' },
        serviceKey: 'vZqohu%2F1a1mKILW%2BslUEpMtWGBv0IvvlkE7zB28hKgPXkvzNMi9%2F2sawykKToWPc%2F%2FNeUM9rnQykkPu%2FLdPlpQ%3D%3D',
        dataList: null,
        bodyInfo: null,

        // 관광 api에 요청할때 사용
        /* 공통 */
        numOfrows: 10, // 한페이지 결과 수
        pageNo: 1, // 페이지 번호
        Mobileos: 'ETC', // OS 구분 : IOS (아이폰), AND (안드로이드), WIN (윈도우폰), ETC(기타)
        listYN: 'Y', // 목록구분(Y=목록, N=개수)
        arrange: 'A', // 정렬구분 (A=제목순, C=수정일순, D=생성일순) 대표이미지가반드시있는정렬(O=제목순, Q=수정일순, R=생성일순)
        contentTypeId: '12', // 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점)
        cateType: '', // 서비스 분류 코드

        /* 위치기반 관광정보조회 */
        mapX: this.userLoc.loc, // GPS X좌표(WGS84 경도좌표)
        mapY: this.userLoc.lat, // GPS X좌표(WGS84 위도좌표)
        radius: '1000', // 거리반경(단위:m) , Max값 20000m=20Km

        /* 키워드 검색 조회 */
        keyword: '휴양', // 검색요청할키워드 : (국문=인코딩필요)
        areaCode: '6', // 지역코드 (현재 사용 X 지역코드 외 시군구코드, 대중소분류 등 더욱 상세히 검색 조건 가능 사용확정 시 추가적으로 알아보기 필요)

        /* 행사정보조회 */
        eventStartDate: 20200101, // 행사시작일(형식 :YYYYMMDD) 필수
        eventEndDate: '', // 행사종료일(형식 :YYYYMMDD)

        /* 공통정보조회 */
        contentId: '126133', // 콘텐츠 아이디
        defaultYN: 'N', // 기본정보조회여부( Y,N )
        firstImageYN: 'Y', // 원본, 썸네일대표 이미지, 이미지 공공누리유형정보 조회여부( Y,N )

        /* 소개정보조회 */
        contentTypeid: '12', // id 소문자 주의 필수값이라서
      }
    },
    methods: {
      choose(api, i){
        this.selectAPI = api
        this.selectAPIindex = i + 1
        this.dataList = []
      },
      fetchData() {
        // 세부적으로 선택한 api 
        const api = this.selectAPI.api

        // 모든 api에 공통으로 들어가는 부분 수정할 필요없음
        const commonUrl = this.baseURL + api + '?serviceKey=' + this.serviceKey + '&MobileOS=' + this.Mobileos + '&MobileApp=AppTest&_type=json'

        // 세부 api별 필수 parameter
        /* 사용된 api 
        locationBasedList1  위치기반 관광정보조회 
        */
        const UserParamLoc = '&mapX=' + this.mapX + '&mapY=' + this.mapY + '&radius=' + this.radius
        /* 사용된 api 
        searchKeyword1 키워드 검색 조회
        */
        const keywordInfo = '&keyword=' + encodeURI(this.keyword)


        // 세부 api별 옵션 parameter
        /* 사용된 api 
        locationBasedList1  위치기반 관광정보조회 
        */
        const pageInfo = '&numOfRows=' + this.numOfrows + '&pageNo=' + this.pageNo
        const listInfo = '&listYN=' + this.listYN
        const arrangeInfo = '&arrange=' + this.arrange
        const contentTypeInfo = '&contentTypeId=' + this.contentTypeId

        /* 사용은 가능한데 현재 사용 X */
        /* api 
        locationBasedList1  위치기반 관광정보조회 
        */
        // const modifiedtimeInfo = '&modifiedtime=' + this.modifiedtime

        let endpointGet;

        if(this.selectAPI.api == 'locationBasedList1'){
          endpointGet = axios.get(commonUrl + pageInfo + listInfo + arrangeInfo + contentTypeInfo + UserParamLoc)
        } else if(this.selectAPI.api == 'searchKeyword1') {
          endpointGet = axios.get(commonUrl + pageInfo + listInfo + arrangeInfo + contentTypeInfo + keywordInfo)
          // endpointGet = axios.get(`&keyword=${encodeURI(this.keyword)}`)
        } else if (this.selectAPI.api == 'searchFestival1') {
          endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&listYN=${this.listYN}&arrange=${this.arrange}&eventStartDate=${this.eventStartDate}`)
        } else if (this.selectAPI.api == 'searchStay1') {
          endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&listYN=${this.listYN}&arrange=${this.arrange}`)
        } else if (this.selectAPI.api == 'detailCommon1') {
          endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&contentId=${this.contentId}&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`)
        } else if (this.selectAPI.api == 'detailIntro1') {
          endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&contentId=${this.contentId}&contentTypeId=${this.contentTypeid}`)
        } else if (this.selectAPI.api == 'detailInfo1') {
          endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&contentId=${this.contentId}&contentTypeId=${this.contentTypeid}`)
        } else if (this.selectAPI.api == 'detailImage1') {
          endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&contentId=${this.contentId}&imageYN=Y&subImageYN=Y`)
        } else if (this.selectAPI.api == 'areaBasedSyncList1') {
          endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&showflag=1&areaCode=${this.areaCode}`)
        } else if (this.selectAPI.api == 'areaCode1') {
          endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&areaCode=1`)
        } else if (this.selectAPI.api == 'categoryCode1') {
          endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&cat1=${this.cateType}&contentTypeId=${this.contentTypeId}`)
        } else if ((this.selectAPI.api == 'detailPetTour1') || (this.selectAPI.api == 'areaBasedList1')) {
          endpointGet = axios.get(`${this.baseURL}${api}?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json`)
        }

        console.log('api', this.selectAPI.api)

        if((this.selectAPI.api == null)) { 
          console.log('api가 없다고 함')
          return false
        } else {
          endpointGet.then(
            (res) => {
                console.log(res.data.response.body)
                this.dataList = res.data.response.body.items.item
                this.bodyInfo = res.data.response.body
            }
          ).catch((err) => {
            console.log(err)
          })
        }
      }
    },
    mounted() {
      // axios.
      // get(`${this.baseURL}searchKeyword1?serviceKey=${this.serviceKey}&numOfRows=${this.numOfrows}&pageNo=${this.pageNo}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json&listYN=${this.listYN}&arrange=${this.arrange}&contentTypeId=${this.contentTypeId}&keyword=${encodeURI(this.keyword)}`)
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

<style lang="scss" scoped>

</style>
<template>
  <div class="basis-full border border-pink-300">
    <div
      v-if="true"
        class="max-w-7xl mx-auto flex justify-end py-4">
      <router-link to="#"
        class="bg-indigo-400 hover:bg-indigo-600 focus:ring-indigo-400 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm">
        글쓰기
      </router-link>
    </div>

    <div class="max-w-7xl mx-auto mb-10">
      <ul class="flex justify-between border-indigo-500 border-t-2 border-b-[1px] p-4 py-2 bg-indigo-50 text-center font-bold">
        <li class="basis-1/12">번호</li>
        <li class="basis-4/12">제목</li>
        <li class="basis-2/12">글쓴이</li>
        <li class="basis-2/12">날짜</li>
        <li class="basis-1/12">조회수</li>
        <li class="basis-1/12">추천</li>
        <li class="basis-1/12">비추천</li>
      </ul>
      <template v-for="(e, index) in 5" :key="index" >
        <ul v-if="true"
          class="flex justify-between border-b text-center px-4 py-2 even:bg-gray-50 text-xs sm:text-sm hover:font-bold">
          <li class="basis-1/12">{{ index }}</li>
          <li class="basis-4/12">
            <router-link
              to="#">{{ `제목자리` }}
            </router-link>
          </li>
          <li class="basis-2/12">{{ `이름` }}</li>
          <li class="basis-2/12">{{ `날짜` }}</li>
          <li class="basis-1/12">{{ `조회수` }}</li>
          <li class="basis-1/12">{{ `추천수` }}</li>
          <li class="basis-1/12">{{ `비추천수` }}</li>
        </ul>
      </template>
    </div>

    <div class="flex justify-center basis-full mb-5 gap-3">
      <button>이전</button>
      <button
        v-for="e in 5" :key="e"
        class="" :class="e == current && 'font-bold text-orange-500'">{{ e }}</button>
      <button>다음</button>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'NoticePage',
    data() {
      return {
        current: 1
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
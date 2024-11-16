<template>
    <div class="sport-detail-container">
      <!-- 显示运动项目名称 -->
      <h1>{{ sport.name }}</h1>
  
      <!-- 显示运动项目金银铜奖情况 -->
      <div class="medal-info">
        <h3>Medal Summary</h3>
        <ul>
          <li>Gold: {{ sport.gold }}</li>
          <li>Silver: {{ sport.silver }}</li>
          <li>Bronze: {{ sport.bronze }}</li>
        </ul>
      </div>
  
      <!-- 显示国家国旗 -->
      <div v-if="country?.flagUrl" class="country-flag">
        <img :src="country?.flagUrl" alt="Country Flag" class="flag" />
      </div>
      <!-- 显示国家名称 -->
      <h2>{{ country?.enLongDescription }} ({{ country?.noc }})</h2>
      <!-- 评论区 -->
    </div>
    <div class="comment-list-container">
        <CommentList />
      </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useRoute } from 'vue-router'; // 使用 Vue Router 获取路由参数
  import { countries } from '@/db'; // 假设从 db.ts 获取国家数据
  import { disciplines } from '@/sportdb'; // 假设从 sportdb.ts 获取运动项目数据
  import CommentList from '@components/CommentList.vue'; // 导入评论列表组件
  
  export default defineComponent({
    name: 'SportDetail',
    components: {
      CommentList, // 注册 CommentList 组件
    },
    setup() {
      const route = useRoute(); // 获取当前路由
      const noc = route.params.noc as string; // 获取国家的 noc 参数
      const sportName = route.params.sportName as string; // 获取运动项目名称
  
      // 根据 noc 从国家数据库获取国家信息
      const country = computed(() => countries.find((item) => item.noc === noc));
  
      // 从 sportdb 中获取指定国家和运动项目的奖牌信息
      const sport = computed(() => {
        const countryDisciplines = disciplines.find((item) => item.noc === noc);
        return countryDisciplines
          ? countryDisciplines.disciplines.find((item) => item.name === sportName)
          : null;
      });
  
      return { country, sport };
    },
  });
  </script>
  
  <style scoped>
  .sport-detail-container {
    width: 80%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  
  h1 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .medal-info {
    background-color: #f8f9fa;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .medal-info h3 {
    font-size: 20px;
    font-weight: bold;
  }
  
  .medal-info ul {
    list-style: none;
    padding: 0;
  }
  
  .medal-info li {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .country-flag {
    margin-bottom: 20px;
  }
  
  .flag {
    width: 60px;
    height: 40px;
    object-fit: cover;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  /* 评论区样式 */
  .comment-list-container {
    position: absolute;
    top: 40%; /* 控制评论区在页面中的位置 */
    right: 20%; /* 将评论区放置在页面的右边 20% 的位置 */
    width: 400px; /* 设置评论区的宽度 */
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .comment-list-container .comment-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  
  .comment-list-container .submit-btn {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .comment-list-container .submit-btn:disabled {
    background-color: #ccc;
  }
  
  .comment-list-container .comments {
    margin-top: 20px;
  }
  
  .comment-list-container .comments ul {
    list-style-type: none;
    padding: 0;
  }
  
  .comment-list-container .comments li {
    background-color: #fff;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  </style>
  
<template>
  <div>
    <!-- 国家信息部分 -->
    <div class="country-info">
      <img v-if="country?.flagUrl" :src="country?.flagUrl" alt="Country Flag" class="flag" />
      <h1>{{ country?.enLongDescription }} ({{ country?.noc }})</h1>
    </div>

    <!-- 奖牌和其他排名信息 -->
    <div v-if="country" class="competition-info">
      <div class="medal-info">
        <h2>Medal Summary</h2>
        <p>Rank: {{ country.rank }}</p>
        <ul>
          <li>Gold: {{ country.gold }}</li>
          <li>Silver: {{ country.silver }}</li>
          <li>Bronze: {{ country.bronze }}</li>
          <li>Total: {{ country.total }}</li>
        </ul>
      </div>
      <div class="rank-info">
        <h2>Other Ranking Info</h2>
        <p>Sort Rank: {{ country.sortRank }}</p>
        <p>Total Rank: {{ country.rankTotal }}</p>
        <p>Sort Total Rank: {{ country.sortTotalRank }}</p>
      </div>
    </div>

    <!-- 如果 country 为空，显示错误信息 -->
    <div v-else>
      <p>Country not found or loading...</p>
    </div>

    <!-- 体育项目列表 -->
    <div class="sport-list">
      <SportList :disciplines="countryDisciplines" :noc="noc" @sport-click="handleSportClick" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router'; // 导入 vue-router 用于跳转
import { countries } from '@/db'; // 引入包含国家数据的文件
import { disciplines } from '@/sportdb'; // 引入包含体育项目数据的文件
import SportList from '@components/SportList.vue'; // 引入 SportList 组件

interface Country {
  noc: string;
  enLongDescription: string;
  rank: number;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
  sortRank: number;
  rankTotal: number;
  sortTotalRank: number;
  flagUrl: string;
}

export default defineComponent({
  name: 'CountryDetail',
  components: {
    SportList,
  },
  props: {
    noc: {
      type: String,
      required: true,
    },
  },
  computed: {
    // 获取国家信息
    country(): Country | undefined {
      return countries.find((country) => country.noc === this.noc);
    },
    // 获取该国家的体育项目
    countryDisciplines() {
      // 从 sportdb 中获取该国家的体育项目
      const countryDisciplines = disciplines.find((item) => item.noc === this.noc);
      return countryDisciplines ? countryDisciplines.disciplines : [];
    },
  },
  methods: {
    handleSportClick(sportName: string) {
      const { noc } = this.$props; // 获取当前国家的 noc
      this.$router.push({
        name: 'SportDetail',
        params: {
          noc: noc,
          sportName: sportName, // 将运动名称传递到 SportDetail 页面
        },
      });
    },
  },
});
</script>

<style scoped>
/* 国家信息样式 */
.country-info {
  position: absolute;
  top: 10%; /* 距离顶部10% */
  left: 5%; /* 距离左边5% */
  width: 40%; /* 宽度40% */
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
}

.flag {
  width: 50px;
  height: 35px;
  object-fit: cover;
}

h1 {
  font-size: 24px;
  font-weight: bold;
}

/* 合并的奖牌信息与其他排名信息 */
.competition-info {
  position: absolute;
  top: 25%; /* 距离顶部25% */
  left: 5%; /* 距离左边5% */
  width: 40%; /* 宽度40% */
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
}

.medal-info,
.rank-info {
  margin-top: 20px;
}

.medal-info h2,
.rank-info h2 {
  font-size: 20px;
  font-weight: bold;
}

.medal-info ul {
  list-style: none;
  padding: 0;
}

.medal-info li {
  margin-bottom: 5px;
}

p {
  font-size: 16px;
  margin: 5px 0;
}

/* 体育项目列表样式 */
.sport-list {
  position: absolute;
  top: 25%; /* 距离顶部20% */
  right: 20%; /* 距离右边5% */
  width: 30%; /* 设置宽度30% */
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  padding: 20px;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .country-info,
  .competition-info {
    position: static; /* 在小屏幕上取消绝对定位 */
    width: 100%; /* 宽度自适应 */
    margin-top: 20px; /* 增加顶部间距 */
    box-shadow: none; /* 取消阴影 */
  }

  .sport-list {
    position: static; /* 在小屏幕上取消绝对定位 */
    width: 100%; /* 宽度自适应 */
    margin-top: 20px; /* 增加顶部间距 */
    box-shadow: none; /* 取消阴影 */
  }

  .country-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .flag {
    width: 40px;
    height: 30px;
  }

  h1 {
    font-size: 20px;
  }

  .medal-info h2,
  .rank-info h2 {
    font-size: 18px;
  }
}
</style>

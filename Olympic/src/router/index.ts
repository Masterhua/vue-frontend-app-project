import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CountryDetail from '../views/CountryDetail.vue';
import SportDetail from '../views/SportDetail.vue'; // 导入 SportDetail 页面

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/country/:noc', // 国家详情页，动态路由参数 noc
      name: 'country-detail',
      component: CountryDetail,
      props: true,
    },
    {
      path: '/sport/:noc/:sportName', // 运动详情页，动态路由参数 noc 和 sportName
      name: 'sport-detail',
      component: SportDetail,
      props: true,
    },
  ],
});

export default router;

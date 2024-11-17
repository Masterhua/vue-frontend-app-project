import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CountryDetail from '../views/CountryDetail.vue';
import SportDetail from '@/views/SportDetail.vue';
import AboutView from '@/views/Aboutview.vue';
import ContactView from '@/views/Contactview.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import nProgress from 'nprogress'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  { path: '/about', 
    name: 'about', 
    component: AboutView,
  },
  { path: '/contact', 
    name: 'contact', 
    component: ContactView 
  },
  {
    path: '/country/:noc',
    name: 'country-detail',
    component: CountryDetail,
    props: true,
  
  },
  {
    path: '/sport/:noc/:sportName',
    name: 'sport-detail',
    component: SportDetail,
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404-error',
    component: NotFoundView, 
  },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})
export default router;

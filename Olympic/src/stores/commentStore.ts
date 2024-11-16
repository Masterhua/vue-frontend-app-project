// src/stores/commentStore.ts
import { defineStore } from 'pinia';

export const useCommentStore = defineStore('comment', {
  state: () => ({
    comments: [] as string[], // 存储评论的数组
  }),
  actions: {
    addComment(comment: string) {
      this.comments.push(comment); // 添加新的评论到数组中
    },
    clearComments() {
      this.comments = []; // 清空评论数组
    },
  },
});

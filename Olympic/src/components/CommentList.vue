<template>
    
      <h3>To Encourage Your Country!</h3>
  
      <!-- 评论输入框 -->
      <textarea v-model="newComment" placeholder="Write your comment..." rows="4" class="comment-input"></textarea>
  
      <!-- 提交按钮 -->
      <button @click="submitComment" class="submit-btn" :disabled="!newComment.trim()">Submit</button>
  
      <!-- 显示评论列表 -->
      <div class="comments">
        <h4>Comments:</h4>
        <ul>
          <li v-for="(comment, index) in comments" :key="index">{{ comment }}</li>
        </ul>
      </div>
    
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useCommentStore } from '@/stores/commentStore'; // 导入 Pinia store
  
  export default defineComponent({
    name: 'CommentList',
    data() {
      return {
        newComment: '', // 新评论的内容
      };
    },
    computed: {
      comments() {
        const store = useCommentStore();
        return store.comments; // 获取存储中的评论列表
      },
    },
    methods: {
      submitComment() {
        if (this.newComment.trim()) {
          const store = useCommentStore();
          store.addComment(this.newComment); // 将新评论添加到 Pinia store
          this.newComment = ''; // 清空输入框
        }
      },
    },
  });
  </script>
  
  <style scoped>
  .comment-list-container {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .comment-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  
  .submit-btn {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .submit-btn:disabled {
    background-color: #ccc;
  }
  
  .comments {
    margin-top: 20px;
  }
  
  .comments ul {
    list-style-type: none;
    padding: 0;
  }
  
  .comments li {
    background-color: #fff;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  </style>
  
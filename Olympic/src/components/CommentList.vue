<template>
  <div class="comment-list-container">
    <h3 class="text-xl font-semibold mb-4">To Encourage Your Country!</h3>
    <textarea v-model="newComment" placeholder="Write your comment..." rows="4" class="comment-input mb-4"></textarea>
    <button @click="submitComment" class="submit-btn w-40 py-2 rounded-md" :disabled="!newComment.trim()">Submit</button>
    <div class="comments mt-6">
      <h4 class="font-semibold text-lg mb-2">Comments:</h4>
      <ul>
        <li v-for="(comment, index) in comments" :key="index" class="comment-item mb-2">{{ comment }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCommentStore } from '@/stores/commentStore';

export default defineComponent({
  name: 'CommentList',
  data() {
    return {
      newComment: '',
    };
  },
  computed: {
    comments() {
      return useCommentStore().comments;
    },
  },
  methods: {
    submitComment() {
      if (this.newComment.trim()) {
        useCommentStore().addComment(this.newComment);
        this.newComment = '';
      }
    },
  },
});
</script>

<style scoped>
.comment-list-container {
  @apply w-full max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md;
}

.comment-input {
  @apply w-full p-3 border border-gray-300 rounded-md;
}

.submit-btn {
  @apply bg-blue-500 text-white rounded-md disabled:bg-gray-300;
}

.comments ul {
  @apply p-0 list-none;
}

.comment-item {
  @apply p-4 bg-white rounded-md shadow-sm;
}
</style>

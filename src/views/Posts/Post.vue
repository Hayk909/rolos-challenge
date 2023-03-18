<template>
  <div class="post__wrapper">
    <h1>Post {{ postId }}</h1>
    <RouterLink to="/">
      <BackIcon />
      <span class="back">Back</span>
    </RouterLink>
    <template v-if="post">
      <h3>{{ post.title }}</h3>
      <div>{{ post.body }}</div>
    </template>
    <Loading v-if="loading" />
  </div>
</template>

<script lang="ts" setup>
  import { PostsApi } from '@/api/api';
  import { Post } from '@/types/posts.types'
  import { computed, onBeforeMount, ref } from 'vue';
  import { useRoute } from 'vue-router';

  import BackIcon from '@/assets/icons/back.vue';
  import Loading from '@/components/Loading.vue';

  const route = useRoute();
  const postId = computed(() => +route.params.postId as Post['id']);
  const post = ref<Post>();

  const loading = ref(false)
  
  async function loadPost() {
    try {
      loading.value = true

      post.value = await PostsApi.getPost(postId.value);
    } catch {
      throw new Error('Error')
    } finally {
      loading.value = false
    }
  }

  onBeforeMount(() => loadPost());
</script>

<style lang="scss" scoped>
.post__wrapper {
  padding: 0 20px;
  .back {
    color: $blue;
  }
}
</style>

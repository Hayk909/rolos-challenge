<template>
  <h1>Posts list</h1>
  <div>
    <div v-if="posts?.length" class="post_wrapper">
      <Pagination
        :total="total"
        :limit="filter.limit"
        :page="filter.skip"
        @onChange="changePage"
        @onPerPage="filter.limit = parseInt($event.target.value)"
      />
      <RouterLink
        v-for="(post, index) of posts"
        :to="{ name: 'post', params: { postId: post.id } }"
        :key="index"
        class="post_wrapper__item"
      >
        <div class="post_wrapper__item__id">#{{ post.id }}</div>
        <div class="post_wrapper__item__title">{{ post.title }}</div>
        <div>{{ post.body }}</div>
      </RouterLink>
    </div>
    <div v-else-if="!loading">
      <p>Sorry, no posts...</p>
    </div>
  </div>
  <Loading v-if="loading" />
</template>

<script lang="ts" setup>
  import { onBeforeMount, ref, watch } from 'vue';

  import { PostsApi } from '@/api/api';
  import { PostsParams, Post } from '@/types/posts.types';

  import Pagination from '@/components/Pagination.vue';
  import Loading from '@/components/Loading.vue';

  const posts = ref<Post[]>();

  const total = ref<number>(0)
  const loading = ref(false)

  const filter = ref<PostsParams>({
    limit: 50,
    skip: 0
  })

  const changePage = (page: number) => {
    const skip = (page - 1) * filter.value.limit

    filter.value.skip = skip
  }

  const loadPosts = async (params: PostsParams) => {
    try {
      loading.value = true

      const data = await PostsApi.getPosts(params);

      posts.value = data.posts
      total.value = data.total
    } catch {
      throw new Error('Error')
    } finally {
      loading.value = false
    }
  }

  watch(filter, (newVal) => {
    loadPosts(newVal)
  }, { deep: true })

  onBeforeMount(() => loadPosts(filter.value));
</script>

<style lang="scss" scoped>
@import '../assets/styles/styles.scss';
</style>

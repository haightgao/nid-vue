<template>
  <component :is="home" />
</template>

<script>
import PostIndex from '@/post/index/post-index';

export default {
  data() {
    return {
      home: 'PostIndex',
    };
  },
  components: { PostIndex },
};
</script>

<script>
export default {
  name: 'Evbircime',
  components: {
  },
  data () {
    return {
      question: '',
      name: undefined
    }
  },
  created () {
  },
  methods: {
  },
  computed: {
  }
}
</script>

<template lang='pug'>
    a-layout
    a-layout-header(:style="{ position: 'fixed', zIndex: 1, width: '100%' }")
        .logo
        a-menu(theme='dark' mode='horizontal' :style="{ lineHeight: '64px' }")
            a-menu-item(key='1' :href="'/events/67a8b83be00c1dfd4b14090f'") nav 1
            a-menu-item(key='2') nav 2
            a-menu-item(key='3') nav 3
    a-layout-content(:style="{ padding: '0 50px', marginTop: '64px' }")
        a-breadcrumb(:style="{ margin: '16px 0' }")
        a-breadcrumb-item Home
        a-breadcrumb-item List
        a-breadcrumb-item App
        div(:style="{ background: '#fff', padding: '24px', minHeight: '380px' }") Content
    a-layout-footer(:style="{ textAlign: 'center' }")
        | Ant Design &copy;2018 Created by Ant UED
</template>

<style scoped>
    #components-layout-demo-fixed .logo {
        width: 120px;
        height: 31px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px 24px 16px 0;
        float: left;
    }
    .site-layout .site-layout-background {
        background: #fff;
    }

    [data-theme='dark'] .site-layout .site-layout-background {
        background: #141414;
    }
</style>

<script>
import { DislikeTwoTone, LikeTwoTone, LikeOutlined, DislikeOutlined, SendOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { notification } from 'ant-design-vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    LikeTwoTone,
    DislikeTwoTone,
    LikeOutlined,
    DislikeOutlined,
    SendOutlined,
    LoadingOutlined
  },
  data () {
    return {
      question: '',
      name: undefined
    }
  },
  created () {
    this.setProperty({ eventId: this.$route.params.eventId })
    this.joinEvent(this.$route.params.eventId)
    this.fetchQuestions()
  },
  methods: {
    ...mapActions(['submitQuestion', 'fetchQuestions', 'setProperty', 'joinEvent', 'vote']),
    async sendQuestion () {
      try {
        await this.submitQuestion({ question: this.question, name: this.name })
        this.question = ''
      } catch (e) {
        notification.error({ message: e.message })
      }
    }
  },
  computed: {
    ...mapState(['questions', 'loading'])
  }
}
</script>

<template lang='pug'>
.home
form(@submit.prevent="sendQuestion")
    a-textarea(
      v-model:value="question"
      placeholder="Type your question"
      :autoSize="{minRows: 2, maxRows: 6}"
    )
    a-input(placeholder="Your name (optional)" v-model:value="name")
    a-button(type="primary" @click="sendQuestion" :disabled="loading") {{ loading ? 'Loading...' : 'Send'}}
      component(:is="loading ? 'LoadingOutlined' : 'SendOutlined'")
div(v-for="question in questions" :key="question._id")
  p Question: {{ question.text }}
  strong Author: {{ question.user }}
  div
    p {{ question.voters.length }}
    div
      a-button-group
        a-button(:type="question.voted ? 'primary' : 'ghost'" @click="vote({ questionId: question._id, vote: question.voted ? 'dislike' : 'like'})")
          component(:is="'LikeOutlined'")
</template>

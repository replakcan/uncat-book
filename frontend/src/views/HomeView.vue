<script>
import { notification } from 'ant-design-vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'HomeView',
  data () {
    return {
      question: '',
      name: undefined
    }
  },
  created () {
    this.setProperty({ eventId: this.$route.params.eventId })
    this.fetchQuestions()
  },
  methods: {
    ...mapActions(['submitQuestion', 'fetchQuestions', 'setProperty']),
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
  div(v-for="question in questions")
    p(v-if="loading") Loading...
    strong {{ question.user }}
    p {{ question.text }}
    p {{ question.votes }}
  form(@submit.prevent="sendQuestion")
    a-textarea(
      v-model:value="question"
      placeholder="Type your question"
      :autoSize="{minRows: 2, maxRows: 6}"
    )
    a-input(placeholder="Your name (optional)" v-model:value="name")
    a-button(type="primary" @click="sendQuestion") Send
</template>

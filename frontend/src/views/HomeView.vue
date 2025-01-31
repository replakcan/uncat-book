<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'HomeView',
  data () {
    return {
      question: '',
      name: ''
    }
  },
  created () {
    this.fetchQuestions()
  },
  methods: {
    ...mapActions(['submitQuestion', 'fetchQuestions']),
    sendQuestion () {
      this.submitQuestion({ question: this.question, name: this.name })
    }
  },
  computed: {
    ...mapState(['questions'])
  }
}
</script>

<template lang='pug'>
.home
  div(v-for="question in questions")
    strong {{ question.user }}
    p {{ question.text }}
    p {{ question.votes }}
  form
    a-textarea(
      v-model:value="question"
      placeholder="Type your question"
      :autoSize="{minRows: 2, maxRows: 6}"
    )
    a-input(placeholder="Your name (optional)" v-model:value="name")
    a-button(type="primary" @click="sendQuestion") Send
</template>

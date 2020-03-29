import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    defaultScore : 0,  
    gottenQuestion : [],
    btnRghtColor: '',
    qtnFont: '',
    optionFont: '',
    bgColor: ''
  },
  getters: {
    name(state) {
      return state.username
    },
    index(state) {
      return state.defaultIndex
    },
    questions(state) {
      return state.gottenQuestion
    },
    score(state) {
      return state.defaultScore
    },
    color(state) {
      return state.btnRghtColor
    },
    qtnFont(state) {
      return state.qtnFont
    },
    optionFont(state) {
      return state.optionFont
    },
    checkBg(state) {
      return state.bgColor
    }
  },
  mutations: {
    fillUserName: (state, payload) => {
      state.username = payload
    },
    getQuestions: (state, payload) => {
      state.gottenQuestion = payload
    },
    answerCorrect: (state, payload) => {
      state.defaultScore = state.defaultScore  + payload
      state.btnRghtColor = 'green'
      setTimeout(() => {
        state.btnRghtColor = 'transparent'
      }, 1000)
    },
    incorrectAnswer: (state) => {
      state.defaultScore = state.defaultScore *  1
      state.btnRghtColor = 'red'
      setTimeout(() => {
        state.btnRghtColor = 'transparent'
      }, 1000)
    },
    updateQtnFont: (state, payload) => {
      state.qtnFont = payload
    },
    updateOptFont: (state, payload) => {
      state.optionFont = payload
    },
    updateBg: (state, payload) => {
      state.bgColor = payload
    }
  },
  actions: {
    getUserName: (context, payload) => {
      context.commit('fillUserName', payload)
    },
    getQuestion: (context) => {
     const draftedQuestions = JSON.parse(localStorage.getItem('draftedQuestion'))
    context.commit('getQuestions', draftedQuestions)
    },
    checkAnswer(context, params){
      const getAllQuestion = JSON.parse(localStorage.getItem('draftedQuestion')) //fetch all question from local storage
      if (params.index == 1) {
        const filteredQuestion = getAllQuestion.slice(0, params.index) //filter fetched question
         //conditional statement to check if clicked option equals correct answer
        if (params.params == filteredQuestion[0].correct_answer) {
          let scoreAddVal = 10
          context.commit('answerCorrect', scoreAddVal)
        } else {
          context.commit('incorrectAnswer')
        }
      } else {
        const filteredQuestion = getAllQuestion.slice(params.index -1, params.index) //filter fetched question
        //conditional statement to check if clicked option equals correct answer
        if (params.params == filteredQuestion[0].correct_answer) {
          //adding 10 marks to user default score
          let scoreAddVal = 10
          context.commit('answerCorrect', scoreAddVal)
        }else {
          context.commit('incorrectAnswer')
      }
      }
    },
    updateQtnFont({commit}, params) {
      commit('updateQtnFont', params)
    },
    updateOptionFont({commit}, params) {
      commit('updateOptFont', params)
    },
    updateBgColor(context, data) {
      context.commit('updateBg', data)
    }
  },
  modules: {
  }
})

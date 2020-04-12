<template>
  <div class="home">
    <h1>JPAスコアツール</h1>
    <ScoreDisp msg="スコアシート"></ScoreDisp>
    <ScoreRegist msg="スコア入力"></ScoreRegist>
  </div>
</template>

<script>
// @ is an alias to /src
import ScoreDisp from '@/components/ScoreDisp.vue'
import ScoreRegist from '@/components/ScoreRegist.vue'

export default {
  name: 'Home',
  components: {
    ScoreDisp,
    ScoreRegist
  }
}
</script>


<template>
  <div class="ScoreDisp">
    <h1>{{ msg }}</h1>
    <div id="score1">
      <span class="board" v-for="(val, index) in dispScoreTitle" v-bind:key="index">{{val}}</span>
    </div>
    <table id="player1" border=1>
      <tr>
        <th>プレイヤー１</th>
        <th>ボールカウント</th>
        <th>セーフティ</th>
        <th>エース</th>
        <th>マスワリ</th>
      </tr>
      <tr>
        <td>{{scoreForm.player1.name}}</td>
        <td>{{scoreForm.player1.ball}}/{{scoreForm.player1.goal}}</td>
        <td>{{scoreForm.player1.safety}}</td>
        <td>{{scoreForm.player1.ace}}</td>
        <td>{{scoreForm.player1.breakrun}}</td>
      </tr>
    </table>
    <table id="common" border=1>
      <tr>
        <th>イニング</th><th>デッド</th>
      </tr>
      <tr>
        <td>{{scoreForm.inning}}</td><td>{{scoreForm.dead}}</td>
      </tr>
    </table>
    <table id="player2" border=1>
      <tr>
        <th>プレイヤー２</th>
        <th>ボールカウント</th>
        <th>セーフティ</th>
        <th>エース</th>
        <th>マスワリ</th>
      </tr>
      <tr>
        <td>{{scoreForm.player2.name}}</td>
        <td>{{scoreForm.player2.ball}}/{{scoreForm.player2.goal}}</td>
        <td>{{scoreForm.player2.safety}}</td>
        <td>{{scoreForm.player2.ace}}</td>
        <td>{{scoreForm.player2.breakrun}}</td>
      </tr>
    </table>
    <div id="score2">
      <span class="board" v-for="(val, index) in scoreTitle" v-bind:key="index">{{val}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { eventBus } from '../main';

interface Player {
  name: string;
  ball: number;
  goal: number;
  safety: number;
  ace: number;
  breakrun: number; 
}

interface ScoreForm {
  player1: Player;
  player2: Player;
  inning: number;
  dead: number;
}

@Component
export default class ScoreDisp extends Vue {
  @Prop() private msg!: string;

  private player1 = {
    name: '',
    ball: 0,
    goal: 0,
    safety: 0,
    ace: 0,
    breakrun: 0
  }

  private player2 = {
    name: '',
    ball: 0,
    goal: 0,
    safety: 0,
    ace: 0,
    breakrun: 0
  }

  private scoreForm = {
    player1: this.player1,
    player2: this.player2,
    inning: 0,
    dead: 0
  }

  private win = 0;

  private scoreBoard = [1,5,10,14,19,25,31,35,38,46,50,55,60,65,70,75];
  private scoreTitle: Array<string> = [];

  private display(scoreForm: ScoreForm) { 
    this.scoreForm = scoreForm;
    this.drawDiagonalLine();
    this.drawCircle();
    console.log(scoreForm);
    this.$store.dispatch('doSave', scoreForm);
    //if (this.scoreForm.player1.ball === this.scoreForm.player1.goal) this.win = 1;
    //if (this.scoreForm.player2.ball === this.scoreForm.player2.goal) this.win = 2;
  }

  // スコアの斜線を描画する
  private drawDiagonalLine() {    
    for (let i=0;i<this.scoreTitle.length;i++){
      document.querySelectorAll('#score1>span')[i].classList.remove('right_up');
      document.querySelectorAll('#score2>span')[i].classList.remove('right_up');
    }

    if (this.scoreForm.player1.ball > 0) {
      for (let i=0;i<this.scoreForm.player1.ball;i++){
        document.querySelectorAll('#score1>span')[i].classList.add('right_up');
      }
    }

    if (this.scoreForm.player2.ball > 0) {
      for (let i=0;i<this.scoreForm.player2.ball;i++){
        document.querySelectorAll('#score2>span')[i].classList.add('right_up');
      }
    }
  }

  // ゴールの丸を描画する
  private drawCircle() {
    for (let i=0;i<this.scoreTitle.length;i++){
      document.querySelectorAll('#score1>span')[i].classList.remove('goal');
      document.querySelectorAll('#score2>span')[i].classList.remove('goal');
    }
    if (this.scoreForm.player1.goal > 0) {
      document.querySelectorAll('#score1>span')[this.scoreForm.player1.goal-1].classList.add('goal');
    }
    if (this.scoreForm.player2.goal > 0) {
      document.querySelectorAll('#score2>span')[this.scoreForm.player2.goal-1].classList.add('goal');
    }
  }

  // 算出プロパティ
  get dispScoreTitle(): Array<string> {
    for(let i=1;i<=75;i++){
      if(this.scoreBoard.includes(i)){
        this.scoreTitle[i-1] = String(i);
      } else {
        this.scoreTitle[i-1] = "·";
      }
    }
    return this.scoreTitle;
  }

  beforeCreated() {
    this.$store.dispatch('doLoad');
  }

  mounted() {
    eventBus.$on('change-form', this.display);
  }

  beforeUpdated() {
    console.log('do');
    this.scoreForm = this.$store.getters.getScoreForm;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

table {
  border-collapse: collapse;
  table-layout: fixed;
  margin-top: 10px;
  margin-bottom: 10px;
}

#player1 th{
  background-color: aqua;
}

#player2 th{
  background-color: burlywood;
}

#common th{
  background-color: darkkhaki;
}

/* 通常のspan */
.board {
  display: inline-block;
  text-align: center;
  width: 18px;
  height: 18px;
}

/* ゴール用のCSS */
.goal {
  height: 18px;
  width: 18px;
  border: 2px solid;
  border-radius: 50%;
  border-color: red;
  line-height: 18px;
  text-align: center;
}

/* 右上がりの斜線 */
.right_up {
  background-image: linear-gradient(-45deg, /*角度*/
                     transparent 49%,
                     black 49%, /*斜線の色*/
                     black 51%, /*斜線の色*/
                     transparent 51%, 
                     transparent); 
}
</style>

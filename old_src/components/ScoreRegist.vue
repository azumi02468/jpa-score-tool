<template>
  <div class="ScoreRegist">
    <h1>{{ msg }}</h1>
    <form action="post" v-on:input="syncScoreSheet()">
      <table id="scoreForm" border=1>
        <thead>
          <tr><th>プレイヤー名</th><th>ゴール</th><th>ボール</th><th>セーフティ</th><th>エース</th><th>マスワリ</th></tr>
        </thead>
        <tbody>
          <!-- プレイヤー１ -->
          <tr>
            <td><input type="text" name="player1" id="player1" v-model="player1.name" /></td>
            <td><input type="number" name="goal1" id="goal1" min="1" max="75" step="1" v-model="player1.goal" /></td>
            <td>
              <input type="button" value="＋" class="plus" v-on:click="plusBall(player1)" />
              <input type="button" value="ー" class="minus" v-on:click="minusBall(player1)" />
            </td>
            <td>
              <input type="button" value="＋" class="plus" v-on:click="plusSafety(player1)" />
              <input type="button" value="ー" class="minus" v-on:click="minusSafety(player1)" />
            </td>
            <td>
              <input type="button" value="＋" class="plus" v-on:click="plusAce(player1)"  />
              <input type="button" value="ー" class="minus" v-on:click="minusAce(player1)"  />
            </td>
            <td>
              <input type="button" value="＋" class="plus" v-on:click="plusBreakrun(player1)"  />
              <input type="button" value="ー" class="minus" v-on:click="minusBreakrun(player1)"  />
            </td>
          </tr>
          <!-- 共通 -->
          <tr>
            <td colspan="3">イニング：
              <input type="button" value="＋" class="plus" v-on:click="plusInning()" />
              <input type="button" value="ー" class="minus" v-on:click="minusInning()" />
            </td>
            <td colspan="3">デッド：
              <input type="button" value="＋" class="plus" v-on:click="plusDead()" />
              <input type="button" value="ー" class="minus" v-on:click="minusDead()" />
            </td>
          </tr>
          <!-- プレイヤー２ -->
          <tr>
            <td><input type="text" name="player2" id="player2" v-model="player2.name" /></td>
            <td><input type="number" name="goal2" id="goal2" min="1" max="75" step="1" v-model="player2.goal" /></td>
            <td>
              <input type="button" value="＋" class="plus" v-on:click="plusBall(player2)" />
              <input type="button" value="ー" class="minus" v-on:click="minusBall(player2)" />
            </td>
            <td>
              <input type="button" value="＋" class="plus" v-on:click="plusSafety(player2)" />
              <input type="button" value="ー" class="minus" v-on:click="minusSafety(player2)" />
            </td>
            <td>
              <input type="button" value="＋" class="plus" v-on:click="plusAce(player2)"  />
              <input type="button" value="ー" class="minus" v-on:click="minusAce(player2)"  />
            </td>
            <td>
              <input type="button" value="＋" class="plus" v-on:click="plusBreakrun(player2)"  />
              <input type="button" value="ー" class="minus" v-on:click="minusBreakrun(player2)"  />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator';
import { eventBus } from '../main';

interface Player {
  name: string;
  ball: number;
  goal: number;
  safety: number;
  ace: number;
  breakrun: number; 
}

@Component
export default class ScoreRegist extends Vue {
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

  // formをスコアシート表示と同期する
  private syncScoreSheet() {
    eventBus.$emit('change-form', this.scoreForm);
  }

  // ボールカウントをプラスしてスコアシートに反映する
  private plusBall(player: Player) {
    if (player.ball < player.goal) {
      player.ball++;
      eventBus.$emit('change-form', this.scoreForm);
    }
  }

  // ボールカウントをマイナスしてスコアシートに反映する
  private minusBall(player: Player) {
    if (player.ball > 0) {
      player.ball--;
      eventBus.$emit('change-form', this.scoreForm);
    }
  }

  // セーフティをプラスしてスコアシートに反映する
  private plusSafety(player: Player) {
    player.safety++;
    eventBus.$emit('change-form', this.scoreForm);
  }

  // セーフティをマイナスしてスコアシートに反映する
  private minusSafety(player: Player) {
    if (player.safety > 0) {
      player.safety--;
      eventBus.$emit('change-form', this.scoreForm);
    }
  }

  // エースをプラスしてスコアシートに反映する
  private plusAce(player: Player) {
    player.ace++;
    eventBus.$emit('change-form', this.scoreForm);
  }

  // エースをマイナスしてスコアシートに反映する
  private minusAce(player: Player) {
    if (player.ace > 0) {
      player.ace--;
      eventBus.$emit('change-form', this.scoreForm);
    }
  }
  
  // マスワリをプラスしてスコアシートに反映する
  private plusBreakrun(player: Player) {
    player.breakrun++;
    eventBus.$emit('change-form', this.scoreForm);
  }

  // マスワリをマイナスしてスコアシートに反映する
  private minusBreakrun(player: Player) {
    if (player.breakrun > 0) {
      player.breakrun--;
      eventBus.$emit('change-form', this.scoreForm);
    }
  }

  // イニングをプラスしてスコアシートに反映する
  private plusInning() {
    this.scoreForm.inning++;
    eventBus.$emit('change-form', this.scoreForm);
  }

  // イニングをマイナスしてスコアシートに反映する
  private minusInning() {
    if (this.scoreForm.inning > 0) {
      this.scoreForm.inning--;
      eventBus.$emit('change-form', this.scoreForm);
    }
  }
  
  // デッドをプラスしてスコアシートに反映する
  private plusDead() {
    this.scoreForm.dead++;
    eventBus.$emit('change-form', this.scoreForm);
  }

  // デッドをマイナスしてスコアシートに反映する
  private minusDead() {
    if (this.scoreForm.dead > 0) {
      this.scoreForm.dead--;
      eventBus.$emit('change-form', this.scoreForm);
    }
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
#scoreForm {
  border-collapse: collapse;
}
#scoreForm>thead {
  background-color: aqua;
}
.plus {
  background-color: forestgreen;
}
.minus {
  background-color: red;
} 
</style>

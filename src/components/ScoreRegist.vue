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
            <td><input type="text" name="player1" id="player1" v-model="scoreForm.player1.name" /></td>
            <td><input type="number" name="goal1" id="goal1" min="1" max="75" step="1" v-model="scoreForm.player1.goal" /></td>
            <td>
              <input type="button" value="＋" class="plus" v-on:click="plusBall(1)" />
              <input type="button" value="ー" class="minus" v-on:click="minusBall(1)" />
            </td>
            <td>
              <input type="button" value="＋" class="plus" v-on:click="plusSafety(1)" />
              <input type="button" value="ー" class="minus" v-on:click="minusSafety(1)" />
            </td>
            <td>
              <input type="button" value="＋" class="plus" v-on:click="plusAce(1)"  />
              <input type="button" value="ー" class="minus" v-on:click="minusAce(1)"  />
            </td>
            <td>
              <input type="button" value="＋" class="plus" v-on:click="plusBreakrun(1)"  />
              <input type="button" value="ー" class="minus" v-on:click="minusBreakrun(1)"  />
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
            <td><input type="text" name="player2" id="player2" v-model="scoreForm.player2.name" /></td>
            <td><input type="number" name="goal2" id="goal2" min="1" max="75" step="1" v-model="scoreForm.player2.goal" /></td>
            <td>
              <input type="button" value="＋" class="plus" v-on:click="plusBall(2)" />
              <input type="button" value="ー" class="minus" v-on:click="minusBall(2)" />
            </td>
            <td>
              <input type="button" value="＋" class="plus" v-on:click="plusSafety(2)" />
              <input type="button" value="ー" class="minus" v-on:click="minusSafety(2)" />
            </td>
            <td>
              <input type="button" value="＋" class="plus" v-on:click="plusAce(2)"  />
              <input type="button" value="ー" class="minus" v-on:click="minusAce(2)"  />
            </td>
            <td>
              <input type="button" value="＋" class="plus" v-on:click="plusBreakrun(2)"  />
              <input type="button" value="ー" class="minus" v-on:click="minusBreakrun(2)"  />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Player } from '../types/types';

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
    console.log(JSON.stringify(this.$store.state));
    this.$store.dispatch('doSave', this.scoreForm);
  }

  // ボールカウントをプラスしてスコアシートに反映する
  private plusBall(target: number) {
    if (target === 1) {
      if (this.scoreForm.player1.ball < this.scoreForm.player1.goal) {
        this.scoreForm.player1.ball++;
        this.$store.dispatch('doSave', this.scoreForm);
      }
    }

    if (target === 2) {
      if (this.scoreForm.player2.ball < this.scoreForm.player2.goal) {
        this.scoreForm.player2.ball++;
        this.$store.dispatch('doSave', this.scoreForm);
      }
    }
  }

  // ボールカウントをマイナスしてスコアシートに反映する
  private minusBall(target: number) {
    if (target === 1) {
      if (this.scoreForm.player1.ball > 0) {
        this.scoreForm.player1.ball--;
        this.$store.dispatch('doSave', this.scoreForm);
      }
    }

    if (target === 2) {
      if (this.scoreForm.player2.ball > 0) {
        this.scoreForm.player2.ball--;
        this.$store.dispatch('doSave', this.scoreForm);
      }
    }
  }

  // セーフティをプラスしてスコアシートに反映する
  private plusSafety(target: number) {
    if (target === 1) {
      this.scoreForm.player1.safety++;
      this.$store.dispatch('doSave', this.scoreForm);
    }

    if (target === 2) {
        this.scoreForm.player2.safety++;
        this.$store.dispatch('doSave', this.scoreForm);
    }
  }

  // セーフティをマイナスしてスコアシートに反映する
  private minusSafety(target: number) {
    if (target === 1) {
      if (this.scoreForm.player1.safety > 0) {
        this.scoreForm.player1.safety--;
        this.$store.dispatch('doSave', this.scoreForm);
      }
    }

    if (target === 2) {
      if (this.scoreForm.player2.safety > 0) {
        this.scoreForm.player2.safety--;
        this.$store.dispatch('doSave', this.scoreForm);
      }
    }
  }

  // エースをプラスしてスコアシートに反映する
  private plusAce(target: number) {
    if (target === 1) {
      this.scoreForm.player1.ace++;
      this.$store.dispatch('doSave', this.scoreForm);
    }

    if (target === 2) {
        this.scoreForm.player2.ace++;
        this.$store.dispatch('doSave', this.scoreForm);
    }
  }

  // エースをマイナスしてスコアシートに反映する
  private minusAce(target: number) {
    if (target === 1) {
      if (this.scoreForm.player1.ace > 0) {
        this.scoreForm.player1.ace--;
        this.$store.dispatch('doSave', this.scoreForm);
      }
    }

    if (target === 2) {
      if (this.scoreForm.player2.ace > 0) {
        this.scoreForm.player2.ace--;
        this.$store.dispatch('doSave', this.scoreForm);
      }
    }
  }
  
  // マスワリをプラスしてスコアシートに反映する
  private plusBreakrun(target: number) {
    if (target === 1) {
      this.scoreForm.player1.breakrun++;
      this.$store.dispatch('doSave', this.scoreForm);
    }

    if (target === 2) {
        this.scoreForm.player2.breakrun++;
        this.$store.dispatch('doSave', this.scoreForm);
    }
  }

  // マスワリをマイナスしてスコアシートに反映する
  private minusBreakrun(target: number) {
    if (target === 1) {
      if (this.scoreForm.player1.breakrun > 0) {
        this.scoreForm.player1.breakrun--;
        this.$store.dispatch('doSave', this.scoreForm);
      }
    }

    if (target === 2) {
      if (this.scoreForm.player2.breakrun > 0) {
        this.scoreForm.player2.breakrun--;
        this.$store.dispatch('doSave', this.scoreForm);
      }
    }
  }

  // イニングをプラスしてスコアシートに反映する
  private plusInning() {
    this.scoreForm.inning++;
    this.$store.dispatch('doSave', this.scoreForm);
  }

  // イニングをマイナスしてスコアシートに反映する
  private minusInning() {
    if (this.scoreForm.inning > 0) {
      this.scoreForm.inning--;
      this.$store.dispatch('doSave', this.scoreForm);
    }
  }
  
  // デッドをプラスしてスコアシートに反映する
  private plusDead() {
    this.scoreForm.dead++;
    this.$store.dispatch('doSave', this.scoreForm);
  }

  // デッドをマイナスしてスコアシートに反映する
  private minusDead() {
    if (this.scoreForm.dead > 0) {
      this.scoreForm.dead--;
      this.$store.dispatch('doSave', this.scoreForm);
    }
  }

  mounted() {
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

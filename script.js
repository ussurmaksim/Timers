Vue.component('timer', {
  template: `
  <div class="timer">
      <div :class="{ activeTimer: isActive }" class="time">
          {{ time }}
      </div>
      <div>
      <button class="stop" v-if="isActive" @click="stop"><img src="img/pause.svg" alt="stop"></button>
      <button class="start" v-else @click="start"><img src="img/triangle.svg" alt="start"></button>
      <button class="clear" v-if="isActive" @click="reset"><img src="img/squareActive.svg" alt="clear"></button>
      <button class="clear" v-else @click="reset"><img src="img/square.svg" alt="clear"></button>
      </div>
  </div>
  `,
  data() {
    return {
      sec: 0,
      min: 0,
      hr: 0,
      int: null,
      time: '00',
      isActive: false,
      activeColor:'#fff'
    }
  },
   props: [ 'items' ],
   methods: {
    start(){ 
      this.isActive = true
      if (this.int !== null) {
              clearTimeout(this.int);
            }
            this.int = setInterval(() => {
              this.sec += 1;
            if(this.sec == 60){
              this.sec = 0;
              this.min += 1;
              if(this.min == 60) {
                this.min = 0;
                this.hr += 1;
              }
            }
            let h = this.hr < 10 ? '0' + this.hr : this.hr;
              let m = this.min < 10 ? '0' + this.min : this.min;
              let s = this.sec < 10 ? '0' + this.sec : this.sec;
          
              if(m == 00 && h == 00){
                this.time = s;
              }else if (h == 00) {
                this.time = `${m} : ${s}`;
              }else {
                this.time = `${h} : ${m} : ${s}`;
              }
            }, 1000);
            
        
    },
    stop(){
          clearInterval(this.int);
          this.isActive = false
        },
    reset(){
        clearInterval(this.int);
        [this.sec, this.min, this.hr] = [0, 0, 0];
        this.time = '00';
        this.isActive = false
      },

  
}, 

})
let app = new Vue({
  el: '#app',
  data : {
    items: [
      {id: 1}
    ]
  },
  methods: {
    handleAddTimer() {
      this.items.push({id: this.items.length + 1})
    }
  }
})


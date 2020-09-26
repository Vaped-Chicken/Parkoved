var app = new Vue({
  el: '#VueCard',
  data: {
    counter: 0,
    info: [],
    attr_list: [],
    len_attr_list: [],
    img: "/home/node1/projects/Parkoved/media/attraction/atr1.jpg",
  },
  methods: {
    next_pic: function(event) {
      let number = Math.trunc(Math.random() * 50) + 1
      // console.log(number);
      axios
        .get('https://www.breakingbadapi.com/api/characters/' + number)
        .then(response => {
          this.info = response.data[0]
          if (event) {
            this.counter++;
            intent = event.originalTarget.className;
            this.send_answers(intent)
          }
        })
    },
    send_answers: function(intent) {
      data = JSON.stringify({
        'user_id': 'lol',
        'rating': intent,
        id: this.info.name
      })
      // axios.post('http://127.0.0.1:5000/', this.counter)
      // console.log(data);
    }

  },
  beforeMount() {
    this.next_pic()
    axios
      .get('/api/v1/attraction')
      .then(response => {
        this.len_attr_list = response.data.length;
        this.attr_list = response.data;
      })
  }

});

Vue.component("modal", {
  template: "#modal-template"
});

new Vue({
  el: "#app",
  data: {
    showModal: false
  }
});


var app = new Vue({
  delimiters: ["[[", "]]"],
  el: '#mainApp',
  data: {
    counter: 1,
    info: [],
    attr_list: [],
    len_attr_list: [],
    attr_ids: [],
    answer_list: [],
    paths: [],

    img: "/home/node1/projects/Parkoved/media/attraction/atr1.jpg",
  },

  methods: {
    next_pic: function(event) {
      let id = this.attr_ids[this.counter]

      axios
        .get('/api/v1/attraction/' + id)
        .then(response => {
          this.info = response.data
          console.log("info ", this.info.name);

          axios
            .get('/api/v1/visitor/2')
            .then(response => {
              this.answer_list = response.data.answer_list
            })

          if (event) {
            this.counter++;
            // console.log(this.len_attr_list);
            // if (this.counter => this.len_attr_list){
            //   showModal: false
            // }

            console.log("in event", this.counter);
            intent = event.target.ownerDocument.activeElement.classList.value
            data = {
              'rating': intent,
              id: id
            }
            // console.log(data);
            // this.answer_list.push(data)
          }

          // console.log(this.answer_list);
        })
    },
    first_pic: function() {
      let id = this.attr_ids[0]

      axios
        .get('/api/v1/attraction/' + id)
        .then(response => {
          this.info = response.data
        })
    },

    send_answers: function(intent, id) {
      // this.answer_list.push()
      // data = JSON.stringify(this.answer_list)


      // console.log(data);

      // axios.post('http://127.0.0.1:5000/', this.counter)
      // console.log(data);
    }

  },
  beforeMount() {
    // сделать проверку номер телефона
    axios
      .get('/api/v1/attraction')
      .then(response => {
        this.len_attr_list = response.data.length;
        this.attr_list = response.data;
        for (let i = 0; i < this.len_attr_list; i++) {
          this.attr_ids.push(this.attr_list[i].id)
        }
        this.first_pic()
      })
  }
});

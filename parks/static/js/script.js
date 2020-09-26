Vue.component('tinderModal', {
  template: '#modal fade'
})


var app = new Vue({
  delimiters: ["[[", "]]"],
  el: '#tinderModal',
  data: {
    showModal: true,
    counter: 1,
    info: [],
    attr_list: [],
    len_attr_list: [],
    attr_ids:[],
    // photo_list_len: [],
    // photo_list: [],
    answer_list:[],
    paths:[],
    // photo_path: null,
    img: "/home/node1/projects/Parkoved/media/attraction/atr1.jpg",
  },


  methods: {
    next_pic: function(event) {
      let id = this.attr_ids[this.counter]
      // console.log('id',id);
      axios
        .get('/api/v1/attraction/'+id)
        .then(response => {
          this.info = response.data
          console.log("info ",this.info.name);

          axios
            .get('/api/v1/visitor/2')
            .then(response => {
              this.answer_list = response.data.answer_list
              // console.log(this.answer_list);

            })

          if (event) {
            this.counter++;
            console.log("in event",this.counter);
            intent = event.target.ownerDocument.activeElement.classList.value
            // console.log(event.target.ownerDocument.activeElement.classList.value);
            // this.send_answers(intent,id)
          }
        })
    },
    first_pic: function(){
      let id = this.attr_ids[0]

      axios
        .get('/api/v1/attraction/'+id)
        .then(response => {
          this.info = response.data
          console.log(" ",this.info.name);

        })
    },

    send_answers: function(intent,id) {
      this.answer_list.push()
      data = JSON.stringify({
        'user_id': 'lol',
        'rating': intent,
        id: id
      })
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
        for (let i = 0; i < this.len_attr_list; i++){
            this.attr_ids.push(this.attr_list[i].id)
        }
        this.first_pic()
      })
  }

});

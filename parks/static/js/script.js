
var app = new Vue({

  delimiters: ["[[", "]]"],
  el: '#app',
  data: {
    counter: 1,
    info: [],
    attr_list: [],
    len_attr_list: [],
    attr_ids: [],
    answer_list: [],
    photo_paths: [],
    restriction: [],
    number: null,
    errors: [],

  },

  methods: {
    change_visibleTinder: function(){
        $('#tinderModal').modal('toggle')
    },
    change_visibleAuth: function(){
        $('#authModal').modal('toggle')
    },
    next_dialog: function () {
      this.change_visibleAuth()
      this.change_visibleTinder()
    },
    clean_counter: function(){
      this.counter = 0;
    },
    checkForm: function () {
     if (this.number) {
       return true;
     }

     this.errors = [];

     if (!this.number == null) {
       this.errors.push('Помогите Илону Маску и укажите номер телефона пожалуста');
        }
     },

    next_pic: function(event) {
      let id = this.attr_ids[this.counter]

      axios
        .get('/api/v1/attraction/' + id)
        .then(response => {
          this.info = response.data
      })
      axios
        .get('/api/v1/restrictions/' + id)
        .then(response => {
          this.restriction = response.data
      })
      axios
        .get('/api/v1/photo/' + id)
        .then(response => {
          this.photo_paths = response.data
      })

        console.log(this.photo_paths.photo);
        if (event) {
          this.counter++;
          if (this.counter >= this.len_attr_list){
              this.change_visibleTinder()
              // this.send_answers()
          }
          intent = event.target.ownerDocument.activeElement.classList.value
          data = {
            'rating': intent,
            id: id
          }
          this.answer_list.push(data)
        }
    },
    first_pic: function() {
      let id = this.attr_ids[0]
      axios
        .get('/api/v1/attraction/' + id)
        .then(response => {
          this.info = response.data
      })
      axios
        .get('/api/v1/restrictions/' + id)
        .then(response => {
          this.restriction = response.data
        })
        axios
          .get('/api/v1/photo/' + id)
          .then(response => {
            this.photo_paths = response.data
        })
    },

    send_answers: function() {
      upload_data = JSON.stringify(this.answer_list)
      axios.patch('/api/v1/visitor/2', upload_data)
      console.log('done');

    }

  },
  mounted(){
    this.change_visibleAuth()
  },
  beforeMount() {
    axios
      .get('/api/v1/visitor/')
      .then(response => {

      })

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

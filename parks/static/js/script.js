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
    visitor_list: [],
    visitor_id: null
  },

  methods: {
    change_visibleTinder: function() {
      $('#tinderModal').modal('toggle')
    },
    change_visibleAuth: function() {
      $('#authModal').modal('toggle')
    },
    next_dialog: function() {
      this.get_number()

    },
    clean_counter: function() {
      this.counter = 0;
    },
    alert_call: function(text) {
      alert(text)
    },
    get_number: function(event) {
      this.number = document.getElementById("visitor_number").value
      if (!this.number) {
        this.alert_call("Бога ради, введи номер телефона")
        // event.preventDefault()
      } else {
        this.check_visitor()
        this.change_visibleAuth()
        this.change_visibleTinder()
      }
    },
    check_visitor: function() {
      axios
        .get('/api/v1/visitor/')
        .then(response => {
            this.visitor_list = response.data
            let num_arr = []
            this.visitor_list.forEach(el => {
              num_arr .push(el.phoneNumber)
            })
            if (this.number in num_arr){
              console.log("number in num_array",this.number);
              this.find_id_visitor()
            }
            else {
              this.create_visitor()
            }
          })
  },

        find_id_visitor: function() {
            for (let i = 0; i <= this.visitor_list.length; i++) {
              if (this.visitor_list[i].phoneNumber == this.number) {
                this.visitor_id = this.visitor_list[i].phoneNumber
              }
            }
            console.log("FIND visitor ID",this.visitor_id);
          },

          create_visitor: function() {
            let csrf = document.cookie.split(' ')[1].split('=')[1]
            const headers = {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrf
            }
            let data = {
              "name": "Jonas",
              "phoneNumber": `${this.number}`
            }

            axios
              .post('api/v1/visitor/', data, {
                headers: headers
              })
              .then(response => {
                this.visitor_id = response.data.id
                  console.log("VISITOR CREATED",this.visitor_id);
            })

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
    if (event) {
      this.counter++;
      if (this.counter >= this.len_attr_list) {
        this.change_visibleTinder()
        this.send_answers()
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
    let csrf = document.cookie.split(' ')[1].split('=')[1]
    const headers = {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrf
    }
    // upload_data = JSON.stringify(this.answer_list)
    // console.log("upload_data",upload_data);
    console.log("ID VISITOR",this.visitor_id);
    axios.patch('/api/v1/visitor/'+this.visitor_id+'/', {
      'answer_list': this.answer_list}, {headers: headers})
      .then( response => {
        // """print route"""
        let liked_attraction = []
        let ant_path_coord = []
        this.answer_list.forEach( el=> {
          if (el.rating == 'heart'){
            liked_attraction.push(el.id)
          }
        })

        let itemsProcessed = 0

        liked_attraction.forEach( (el, index, array) => {
          axios.get(`/api/v1/attraction/${el}/`).then( result => {
            let coord = [Number(result.data.altitude),Number(result.data.longitude)]
            ant_path_coord.push(coord)

            itemsProcessed++;
            if( itemsProcessed == array.length) {
              let antPolyline = new L.Polyline.AntPath(ant_path_coord, {color: 'red', weight: 5})
              antPolyline.addTo(map)
            }
          })
        })

      }
    )
  }

},
mounted() {
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

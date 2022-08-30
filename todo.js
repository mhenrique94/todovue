var app = new Vue({
    el: "#app",
    data: {
      tasks: [
      ],
      
    },
    methods: {
      getTasks() {
        fetch('http://localhost:3000/tasks')
        .then((response) => response.json())
        .then((jsontasks) => this.tasks = jsontasks)
      },
      deleteTasks(id){
        fetch(`http://localhost:3000/tasks/${id}`, {
          method: "DELETE",
        });
      },
      
      editTasks(id){
        fetch(`http://localhost:3000/tasks/${id}`).then(response => response.json()).then(resp => {
          console.log(resp)
          app2.task.id = resp.id
          app2.task.title = resp.title
          app2.task.dueTo = resp.dueTo
          app2.task.project = resp.project
          app2.task.user = resp.user
        })
      },
      
    },
    created(){
      this.getTasks()
    },


  })

var app2 = new Vue({
  el: "#app2",
  data: {
    task:{
      id: null,
      title: null,
      dueTo: null,
      project: null,
      user: null,
    },
  },
  methods: {
    postTasks(){
      const data = this.task

      const dataJson = JSON.stringify(data);

      fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      });
    },

    
    
  },
  
});
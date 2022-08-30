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
    },
    created(){
      this.getTasks()
    }
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
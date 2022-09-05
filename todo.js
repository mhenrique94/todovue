var app = new Vue({
    el: "#app",
    data: {
      tasks: [
      ],

      task:{
        id: null,
        title: null,
        dueTo: null,
        project: null,
        user: null,
      },

      editIsEnabled: false,
      listIsEnabled: true,
      loading: false,
      input :'',

    },
    methods: {
      getTasks() {
        this.loading = false
        fetch('http://localhost:3000/tasks')
        .then((response) => response.json())
        .then((jsontasks) => this.tasks = jsontasks)
        this.loading = true
      },
      deleteTasks(id){
      
        fetch(`http://localhost:3000/tasks/${id}`, {
          method: "DELETE",
        });
        window.location.href = "index.html";
      },
      
      editTasks(id){
        fetch(`http://localhost:3000/tasks/${id}`).then(response => response.json()).then(resp => {
          console.log(resp)
          this.task.id = resp.id
          this.task.title = resp.title
          this.task.dueTo = resp.dueTo
          this.task.project = resp.project
          this.task.user = resp.user
        })

        this.editIsEnabled ? this.editIsEnabled = false : this.editIsEnabled = true
        this.listIsEnabled ? this.listIsEnabled = false : this.listIsEnabled = true
      },

      postTasks(){
        this.loading = false
        const data = this.task
  
        const dataJson = JSON.stringify(data);
  
        fetch("http://localhost:3000/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: dataJson,
        });

        window.location.href = "index.html";
      },

      updateTasks(){
        const data = this.task
  
        const dataJson = JSON.stringify(data);
  
        fetch(`http://localhost:3000/tasks/${this.task.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: dataJson,
        });
        window.location.href = "index.html"
      },
      
    },
    created(){
      this.getTasks()
    },
    computed: {
      inputSearch() {
        return this.tasks.filter((elem) => elem.title.toLowerCase().includes(this.input.toLowerCase()))
      }
    }
})
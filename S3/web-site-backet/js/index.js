Vue.use(VeeValidate, {locale: 'ja'});

var tasks = new Vue({
    el: '#tasks',
    data: {
        tasks:[],
        newTask: '',
        newDetail: ''
    },
    computed: {
        sortedTasks: function(){
            return this.tasks.sort(function(a, b){
                let comparison = 0;
                if (a.id > b.id){
                    comparison = 1;
                } else if (a.id < b.id){
                    comparison = -1;
                }
                return comparison;
            });
        }
    },
    methods: {
        getAll: function(){
            this.tasks = [];
            var tasks = this.tasks;
            axios.get(this.endpoint()).then(response =>{
                console.log(response);
                response.data.Items.forEach(element => {
                    tasks.push(element);
                });
            }).catch(function(error) {
                console.log(error);
            });
        }, 
        createTask: function(){
            this.$validator.validateAll().then((result) => {
                if (result) {
                //エラーがなければ下記が実行される
                    var new_id;
                    if (this.tasks.length === 0){
                        new_id = 1;
                    } else {
                        new_id = this.tasks[this.tasks.length - 1].id + 1;
                    }
                    //var new_id = String(this.tasks.length);
                    //this.tasks.push({id: new_id, taskname: this.newTask});
                    axios.put(this.endpoint(),{
                        Item: {
                            id: new_id,
                            taskname: this.newTask,
                            detail: this.newDetail
                        }
                    }).then(response => {
                        console.log('送信した');
                        console.log(response);
                        this.getAll();
                    }).catch(function(err){
                        console.log(err);
                    });
                    this.newTask = '';
                    this.newDetail = '';
                } else {
                    console.log('エラーがあります');
                }
            });
        },
        deleteTask: function(taskId){
            var id = taskId;
            console.log(id, 'を削除する');
            axios.delete(this.endpoint(),{
                params: {
                    id: id
                } 
            }).then(response => {
                console.log('削除した');
                console.log(response);
                this.getAll();
            }).catch(function(err){
                console.log(err);
            });
        },
        endpoint: function(){
            return 'https://l3uk6hufcf.execute-api.ap-northeast-1.amazonaws.com/prod/sample-tasks';
        }
    }
});

tasks.getAll();

/* また今度
var CompTask = {
    props: [id],
    template: '<div></div>'
}

var app = new SVGUseElement({
    el: '#app',
    components: {
        'comp-task': CompTask
    }
});

*/
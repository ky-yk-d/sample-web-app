Vue.use(VeeValidate, {locale: 'ja'});
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('submit').addEventListener('click',function(){
        var status = document.getElementById('status');
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4){ // 通信完了
                if (xhr.status === 200) { // 通信成功
                    status.textContent = '送信しました';
                } else {
                    status.textContent = 'サーバーエラーが発生しました';
                }
            } else {
                status.textContent = '送信中';
            }
        };
        var obj = {
            Item : {
                id: document.getElementById('ID').value,
                taskname: document.getElementById('taskname').value
            }
        };
        var json = JSON.stringify(obj);
        xhr.open('PUT', 'https://l3uk6hufcf.execute-api.ap-northeast-1.amazonaws.com/prod/sample-tasks', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        console.log(json);
        xhr.send(json);
    });
});

document.addEventListener('DOMContentLoaded', function(){
    // 取得ボタンクリック時に実行される
    document.getElementById('btn').addEventListener('click', function(){
            var result = document.getElementById('result');
            var xhr = new XMLHttpRequest();
            // 非同期通信時の処理
            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4){ // 通信完了
                    if (xhr.status === 200) { // 通信成功
                        //var data = JSON.parse(xhr.responseText);
                        var data = xhr.response;
                        // 結果からキーにアクセス
                        if (data === null) {
                            // ない場合はメッセージ
                            result.textContent = 'データが存在しません';
                        } else {
                            // 取得できた場合
                            console.log(typeof(data));
                            console.log(data);
                            var items = data.Items;
                            var ul = document.createElement('ul');
                            for (var i = 0; i < items.length; i++){
                                var li = document.createElement('li');
                                var text = document.createTextNode(items[i].ID + ' ' + items[i].taskname);
                                // 組み立て
                                li.appendChild(text);
                                ul.appendChild(li);
                            }
                            // <div id="result">の配下を置き換える
                            result.replaceChild(ul, result.firstChild);
                        }
                    } else {
                        result.textContent = 'サーバエラーが発生';
                    }
                } else { // 通信中
                    result.textContent = '通信中';
                }
            };
            // 非同期通信を開始
            xhr.responseType = 'json';
            xhr.open('GET', 'https://l3uk6hufcf.execute-api.ap-northeast-1.amazonaws.com/prod/sample-tasks', true);
            xhr.send(null);
        }, false );
    } ,false);

var getAllTasks = new Vue({
    el: '#get-all-tasks',
    data: {
        id: '',
        items:[],
    },
    methods: {
        getAll: function(){
            this.items = [];
            var id = this.id;
            var items = this.items;
            axios.get(this.endpoint()).then(response =>{
                console.log(response);
                response.data.Items.forEach(element => {
                    items.push(element);
                });
            }).catch(function(error) {
                console.log(error);
            });
        },
        endpoint: function(){
            return 'https://l3uk6hufcf.execute-api.ap-northeast-1.amazonaws.com/prod/sample-tasks';
        }
    }
});

var tasks = new Vue({
    el: '#tasks',
    data: {
        tasks:[],
        newTask: '',
    },
    methods: {
        createTask: function(){
            //var new_id = this.tasks[this.tasks.length - 1] + 1;
            var new_id = String(this.tasks.length);
            this.tasks.push({id: new_id, taskname: this.newTask});
            axios.put(this.endpoint(),{
                Item: {
                    id: new_id,
                    taskname: this.newTask
                }
            }).then(response => {
                console.log('送信した');
                console.log(response);
            }).catch(function(err){
                console.log(err);
            });
            this.newTask = '';
        },
        endpoint: function(){
            return 'https://l3uk6hufcf.execute-api.ap-northeast-1.amazonaws.com/prod/sample-tasks';
        }
    }
});


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
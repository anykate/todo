window.setTimeout(function () {
    $(".alert")
        .fadeTo(500, 0)
        .slideUp(500, function () {
            $(this).remove();
        });
}, 1000);

function sendRequest(url, method, data) {
    let r = axios({
        method: method,
        url: url,
        data: data,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    return r;
}

let app = new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        task: '',
        tasks: [
            {title: 'one'},
            {title: 'two'},
        ]
    },
    created() {
        let vm = this;
        let r = sendRequest('', 'get')
            .then(function (response) {
                vm.tasks = response.data.tasks;
            })
    },
    methods: {
        createTask() {
            let vm = this;
            let formData = new FormData();
            formData.append('title', this.task);
            sendRequest('', 'POST', formData)
                .then(function (response) {
                    vm.tasks.push(response.data.task);
                    vm.task = '';
                })
        },
        completeTask(id, index) {
            let vm = this;
            sendRequest('' + id + '/complete/', 'POST')
                .then(function (response) {
                    vm.tasks.splice(index, 1);
                    vm.tasks.push(response.data.task);
                })
        },
        deleteTask(id, index) {
            let vm = this;
            sendRequest('' + id + '/delete/', 'POST')
                .then(function (response) {
                    vm.tasks.splice(index, 1);
                })
        }
    },
    computed: {
        taskList() {
            function compare(a, b) {
                if (a.completed > b.completed) {
                    return 1;
                }
                if (a.completed < b.completed) {
                    return -1;
                }
                return 0;
            }

            return this.tasks.sort(compare);
        }
    }
})

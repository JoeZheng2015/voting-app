document.addEventListener('DOMContentLoaded', function () {
    const $ = el => document.querySelector(el)
    const $input = $('.Admin__input')
    const $btn = $('.btn')

    function addVote() {
        const value = $input.value
        const payload = JSON.stringify({
            title: value,
        })

        if (value.trim()) {
            fetch('/vote/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: payload,
            })
                .then(res => res.json())
                .then(res => {
                    if (res.ret === 0) {
                        location.assign('/')
                    }
                    else {
                        aler(res.message)
                    }
                })
        }
        else {
            alert('请输入项目标题')
        }
    }

    $btn.addEventListener('click', addVote, false)
    document.addEventListener('keypress', function(e) {
        if (e.keyCode === 13) {
            addVote()
        }
    }, false)
}, false)
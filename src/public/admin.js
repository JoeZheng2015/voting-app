document.addEventListener('DOMContentLoaded', function () {
    const $ = el => document.querySelector(el)
    const $input = $('.input')
    const $btn = $('.btn')

    $btn.addEventListener('click', function () {
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
                    console.log(res)
                })
        }
        else {
            alert('请输入项目标题')
        }
    }, false)
}, false)
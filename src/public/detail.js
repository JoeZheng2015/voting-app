document.addEventListener('DOMContentLoaded', function () {
    const $ = el => document.querySelector(el)
    const $btnBox = $('.btnBox')

    $btnBox.addEventListener('click', e => {
        const $target = e.target
        const { type } = $target.dataset
        const id = location.pathname.split('/')[2]

        fetch(`/vote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type,
            }),
        })
        .then(res => res.json())
        .then(res => {
            if (res.ret === 0) {
                location.reload(false)
            }
            else {
                alert(ret.message)
            }
        })
    }, false)
}, false)
function hideSpinner() {
    let spinner = document.getElementById('spinner');
    spinner.style.display = 'none';
}
function showSpinner() {
    let spinner = document.getElementById('spinner');
    spinner.style.display = 'block';
}

function debounce(f, ms) {
    let isCooldown = false;

    return function() {
      if (isCooldown) return;
  
      f.apply(this, arguments);
  
      isCooldown = true;
  
      setTimeout(() => isCooldown = false, ms);
    };
};

async function sendRequest() {
    let sendUrl = 'http://10.20.100.236/enps/controller.html';
    const formData = new FormData();
    formData.append('action', 'testApi');
    let respObj = {
        method: 'POST',
        header: {
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    }
    let response = await fetch(sendUrl, respObj);

    return await response
}

function searchCols(text) {

    console.log(text)

    $.ajax({
        url: "http://10.20.100.236/enps/controller.html",
        data: {
            action: 'testApi',
            search_text: text
        },
        method: "POST",
        success: function (data) {
            alert(data);
        }
    })

}


$(window).on('load', function () {
    const f = debounce( searchCols, 500);
    $('#searchText').on('keyup', function (elem) {
        if (this.value.length >= 3) {
            setTimeout(() => f(this.value), 500)
        }
    })

})



// sendRequest().then(data => renderApp(data))


// const renderApp = (data) => {
//     const html = JSON.stringify(data.status);
//     document.body.innerHTML = html;
// }



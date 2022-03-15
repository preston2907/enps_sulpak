let choosedArr = [];

function hideSpinner() {
    let spinner = document.getElementById('spinner');
    spinner.style.display = 'none';
}


function showSpinner() {
    let spinner = document.getElementById('spinner');
    spinner.style.display = 'block';
}

function delay(callback, ms) {
    var timer = 0;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}

function deleteChoosed(obj, button) {

    let indexToDel = choosedArr.findIndex(elem => elem.id == obj.id);
    choosedArr.splice(indexToDel, 1);
    button.parentElement.parentElement.remove()
    const create_btn = document.getElementById('create_polls');
    if (choosedArr.length == 0) {
        let tableBody = document.getElementById('choosed_body');
        tableBody.parentElement.style.display = 'none';
        document.querySelector('.form-container--choosed_block--empty_message').style.display = 'block';
        create_btn.classList.remove('btn-success');
        create_btn.classList.add('btn-secondary');
        create_btn.disabled = true;
    }

}


function addTrToTable(obj, tbody, buttonElem) {

    let newTr = document.createElement('tr');

    let tdFio = document.createElement('td');
    tdFio.innerHTML = obj.fullname;

    let tdSub = document.createElement('td');
    tdSub.innerHTML = obj.subdivision_name;

    let tdButton = document.createElement('td');
    let addButton = document.createElement('button');
    addButton.innerHTML = 'Удалить';
    addButton.classList.add('btn');
    addButton.classList.add('btn-danger');
    addButton.classList.add('btn-sm');
    addButton.setAttribute('type', 'button');
    addButton.addEventListener('click', (elem) => {
        deleteChoosed(obj, addButton)
    });
    tdButton.appendChild(addButton);

    newTr.appendChild(tdFio);
    newTr.appendChild(tdSub);
    newTr.appendChild(tdButton);
    tbody.appendChild(newTr);
}


function renderTableBody(jsonObj) {

    showSpinner()

    let searchTable = document.getElementById('search_table');
    searchTable.style.display = 'none';

    let tableBody = document.getElementById('search_body');
    tableBody.innerHTML = '';

    jsonObj.forEach((element, ind) => {
        let newTr = document.createElement('tr');

        let tdNumber = document.createElement('td');
        tdNumber.innerHTML = ind + 1;

        let tdFio = document.createElement('td');
        tdFio.innerHTML = element.fullname;

        let tdSub = document.createElement('td');
        tdSub.innerHTML = element.subdivision_name;

        let tdButton = document.createElement('td');
        let addButton = document.createElement('button');
        addButton.innerHTML = 'Добавить';
        addButton.classList.add('btn');
        addButton.classList.add('btn-primary');
        addButton.classList.add('btn-sm');
        addButton.classList.add('add-btn');
        addButton.setAttribute('type', 'button');
        addButton.addEventListener('click', (elem) => {
            addChoosedElem(element, elem.target)
        });
        tdButton.appendChild(addButton);


        newTr.appendChild(tdNumber);
        newTr.appendChild(tdFio);
        newTr.appendChild(tdSub);
        newTr.appendChild(tdButton);
        tableBody.appendChild(newTr);
    });

    if (jsonObj.length > 0) {
        searchTable.style.display = 'table';
    } else {
        $('.form-container--search_block--empty_message').show();
    }

}

function addChoosedElem(elemObj, buttonElem) {

    let tableBody = document.getElementById('choosed_body');
    const create_btn = document.getElementById('create_polls');

    if (choosedArr.findIndex((elem) => { return elem.id == elemObj.id }) == -1) {
        choosedArr.push(elemObj);
        addTrToTable(elemObj, tableBody, buttonElem)
        console.log(choosedArr);
        buttonElem.disabled = true;
        buttonElem.innerHTML = "Добавлено";
        if (choosedArr.length > 0) {
            tableBody.parentElement.style.display = 'table';
            document.querySelector('.form-container--choosed_block--empty_message').style.display = 'none';
            create_btn.classList.remove('btn-secondary');
            create_btn.classList.add('btn-success');
            create_btn.disabled = false;
        }
    } else {
        alert('Данный сотрудник ранее уже добавлен');
        buttonElem.disabled = true;
        buttonElem.innerHTML = "Добавлено";
    }


}

function searchCols(text) {
    let searchTable = document.getElementById('search_table');

    if (text.length >= 3) {

        $('.form-container--search_block--empty_message').hide();
        showSpinner();

        searchTable.style.display = 'none';

        $.ajax({
            url: "http://kazsdo.sulpak.kz:81/enps/controller.html",
            data: {
                action: 'find_person',
                search_text: text
            },
            method: "POST",
            success: function (data) {
                renderTableBody(data);
                hideSpinner();
            }
        })
    } else {
        $('.form-container--search_block--empty_message').show();
        searchTable.style.display = 'none';
    }

}
function createPols() {
    let tableBody = document.getElementById('choosed_body');
    let search_body = document.getElementById('search_body');
    const create_btn = document.getElementById('create_polls');
    const success_message = document.querySelector('.form-container--choosed_block--success_message');
    const empty_message_choose = $('.form-container--choosed_block--empty_message');
    const empty_message_search = $('.form-container--search_block--empty_message');

    create_btn.disabled = true;
        $.ajax({
            url: "http://kazsdo.sulpak.kz:81/enps/controller.html",
            data: {
                action: 'create_poll_result',
                pols_arr: JSON.stringify(choosedArr)
            },
            method: "POST",
            success: function (data) {
                tableBody.parentElement.style.display = 'none';
                choosedArr = [];
                success_message.hidden = false;
                create_btn.classList.add('btn-secondary');
                create_btn.classList.remove('btn-success');
                setTimeout(() => {
                    search_body.parentElement.style.display = 'none';
                    success_message.hidden = true;
                    empty_message_choose.show();
                    empty_message_search.show();
                    tableBody.innerHTML = '';
                    search_body.innerHTML = '';
                    $('#searchText').val('');
                }, 4000);

            }
        })
    }





$(window).on('load', function () {

    $('#searchText').on('keyup', delay(function (el) {
        searchCols(this.value)
    }, 300))
})



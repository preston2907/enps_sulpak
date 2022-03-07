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

    if (choosedArr.length == 0) {
        let tableBody = document.getElementById('choosed_body');
        tableBody.parentElement.style.display = 'none';
        document.querySelector('.form-container--choosed_block--empty_message').style.display = 'block';
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
        searchTable.style.display = 'block';
    } else {
        $('.form-container--search_block--empty_message').show();
    }

}

function addChoosedElem(elemObj, buttonElem) {

    let tableBody = document.getElementById('choosed_body');

    if (choosedArr.findIndex((elem) => { return elem.id == elemObj.id }) == -1) {
        choosedArr.push(elemObj);
        addTrToTable(elemObj, tableBody, buttonElem)
        console.log(choosedArr);
        buttonElem.disabled = true;
        buttonElem.innerHTML = "Добавлено";
        if (choosedArr.length > 0) {
            tableBody.parentElement.style.display = 'block';
            document.querySelector('.form-container--choosed_block--empty_message').style.display = 'none';
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
            url: "http://10.20.100.236/enps/controller.html",
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
function createPols(text) {
    let searchTable = document.getElementById('search_table');

    if (text.length >= 3) {

        $('.form-container--search_block--empty_message').hide();
        showSpinner();

        searchTable.style.display = 'none';

        $.ajax({
            url: "http://10.20.100.236/enps/controller.html",
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



$(window).on('load', function () {

    $('#searchText').on('keyup', delay(function (el) {
        searchCols(this.value)
    }, 300))
})



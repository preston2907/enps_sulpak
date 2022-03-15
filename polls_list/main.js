let modalWindow = new bootstrap.Modal(document.getElementById('myModal'));
function hideSpinner() {
    let spinner = document.getElementById('spinner');
    spinner.style.display = 'none';
}


function showSpinner() {
    let spinner = document.getElementById('spinner');
    spinner.style.display = 'block';
}

function renderTableBody(jsonObj) {


    let activeTable = document.getElementById('active_table');
    let activeTableBody = document.getElementById('active_body');
    activeTableBody.innerHTML = ""

    if (jsonObj.activeArr.length > 0) {
        $('#active_body .empty_row').parent().hide()

        jsonObj.activeArr.forEach((element, ind) => {
            let newTr = document.createElement('tr');

            let tdFio = document.createElement('td');
            tdFio.innerHTML = element.colleg_name;

            let tdSub = document.createElement('td');
            tdSub.innerHTML = element.sub_name;

            let tdCreateDate = document.createElement('td');
            tdCreateDate.innerHTML = element.create_date;

            let tdButton = document.createElement('td');
            // tdButton.classList.add('row')
            let fillButton = document.createElement('button');
            fillButton.innerHTML = '<i class="bi bi-pencil-square"></i>';
            fillButton.classList.add('btn');
            fillButton.classList.add('btn-success');
            fillButton.classList.add('btn-sm');
            fillButton.classList.add('fill-btn');
            fillButton.setAttribute('type', 'button');
            fillButton.setAttribute('data-bs-toggle', 'tooltip');
            fillButton.setAttribute('data-bs-placement', 'top');
            fillButton.setAttribute('data-bs-original-title', 'Заполнить');
            fillButton.addEventListener('click', (elem) => {
                renderFillModal(element);
                modalWindow.show()
            });
            tdButton.appendChild(fillButton);

            let deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
            deleteButton.classList.add('btn');
            deleteButton.classList.add('btn-danger');
            deleteButton.classList.add('btn-sm');
            deleteButton.classList.add('del-btn');
            deleteButton.setAttribute('type', 'button');
            deleteButton.setAttribute('data-bs-toggle', 'tooltip');
            deleteButton.setAttribute('data-bs-placement', 'top');
            deleteButton.setAttribute('data-bs-original-title', 'Удалить');
            deleteButton.addEventListener('click', (elem) => {
                renderDeleteModal(element.id);
                modalWindow.show()
            });
            tdButton.appendChild(deleteButton);


            newTr.appendChild(tdFio);
            newTr.appendChild(tdSub);
            newTr.appendChild(tdCreateDate);
            newTr.appendChild(tdButton);
            activeTableBody.appendChild(newTr);
            $('[data-bs-toggle=tooltip]').tooltip()
        });




    }


    let finishTable = document.getElementById('finish_table');
    let finishTableBody = document.getElementById('finish_body');
    finishTableBody.innerHTML = "";

    if (jsonObj.finishArr.length > 0) {
        $('#finish_body .empty_row').parent().hide()
        jsonObj.finishArr.forEach((element, ind) => {
            let newTr = document.createElement('tr');

            let tdFio = document.createElement('td');
            tdFio.innerHTML = element.colleg_name;

            let tdSub = document.createElement('td');
            tdSub.innerHTML = element.sub_name;

            let tdCreateDate = document.createElement('td');
            tdCreateDate.innerHTML = element.create_date;

            let tdMark = document.createElement('td');
            tdMark.innerHTML = element.mark;

            let tdComment = document.createElement('td');
            tdComment.innerHTML = element.comment;

            newTr.appendChild(tdFio);
            newTr.appendChild(tdSub);
            newTr.appendChild(tdCreateDate);
            newTr.appendChild(tdMark);
            newTr.appendChild(tdComment);
            finishTableBody.appendChild(newTr);
        });


    }


}

function renderFillModal(jsonObj) {

    let headerModal = document.getElementById('exampleModalLabel');
    headerModal.innerHTML = 'Заполнение Анкеты';

    let modalBody = document.getElementById('modal_body');
    // modalBody.innerHTML = 'Тут форма заполнения Анкеты';

    let htmlString = `
        <div class="mb-3 row">
            <label for="staticFullname" class="col-sm-2 col-form-label">ФИО</label>
            <div class="col-sm-10">
                <input type="text" disabled readonly class="form-control-plaintext" id="staticFullname" value="${jsonObj.colleg_name}">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="staticSubdivName" class="col-sm-2 col-form-label">Подразделение</label>
            <div class="col-sm-10">
                <input type="text" disabled readonly class="form-control-plaintext" id="staticSubdivName" value="${jsonObj.sub_name}">
            </div>
        </div>
        <div class="mb-3 row">
            <label for="staticCreateDate" class="col-sm-2 col-form-label">Дата создания</label>
            <div class="col-sm-10">
                <input type="text" disabled readonly class="form-control-plaintext" id="staticCreateDate" value="${jsonObj.create_date}">
            </div>
        </div>

        <div class="mb-3 row">
            <label for="inputMark" class="col-sm-2 col-form-label">Оценка</label>
            <div class="col-sm-10">
            <select class="form-select" id="inputMark" aria-label="Default select example">
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            </div>
        </div>
        <div class="mb-3 row">
            <label for="inputComment" class="col-sm-2 col-form-label">Комментарий</label>
            <div class="col-sm-10">
                <input type="text validate" class="form-control" id="inputComment">
            </div>
        </div>
    `
    modalBody.innerHTML = htmlString;

    let doButton = document.getElementById('do_button');
    doButton.innerHTML = '<i class="bi bi-check-square"></i> Готово';
    doButton.classList.add('btn-success');
    doButton.classList.remove('btn-danger');
    doButton.addEventListener('click',(elem)=>{
        fillPR(jsonObj.id);
    })
}

function renderDeleteModal(poll_result_id) {

    let headerModal = document.getElementById('exampleModalLabel');
    headerModal.innerHTML = 'Удаление анкеты';

    let modalBody = document.getElementById('modal_body');
    modalBody.innerHTML = 'Вы точно уверены что хотите удалить анкету?';

    let doButton = document.getElementById('do_button');
    doButton.innerHTML = '<i class="bi bi-trash"></i> Удалить';
    doButton.classList.remove('btn-success');
    doButton.classList.add('btn-danger');
    doButton.addEventListener('click',(elem)=>{
        deletePR(poll_result_id);
    })
}


function getPollsArr() {
    const tabsContainer = document.getElementById('pills-tabContent');
    $.ajax({
        url: "http://kazsdo.sulpak.kz:81/enps/controller.html",
        data: {
            action: 'get_polls_list'
        },
        method: "POST",
        success: function (data) {
            console.log(data)
            hideSpinner();
            tabsContainer.hidden = false;
            renderTableBody(data);
        },
        error: function (data) {
            console.log(data)
        },
    })
}

function fillPR(prID) {

    let score, comment; 
    if ($('#inputComment').val() != ''){
        
        $('.modal-footer').hide();
        score = $('#inputMark').val();
        comment = $('#inputComment').val();

        $.ajax({
            url: "http://kazsdo.sulpak.kz:81/enps/controller.html",
            data: {
            action: "fill_poll_result",
            pr_id: prID,
            mark: score,
            comment: comment
        },
        method: "POST",
        success: function (data) {
            $('.modal-body').html(`<h3>Результат сохранен</h3>`)
            getPollsArr();
            modalWindow.toggle()
            $('.modal-footer').show();
            
        },
        error: function (data) {
            console.log(data)
        },
    })
    } else{
        alert('Поле комментарий не заполнено');
    }
}


function deletePR(pr_id){
    $.ajax({
        url: "http://kazsdo.sulpak.kz:81/enps/controller.html",
        data: {
            action: "delete_poll_result",
            pr_id
        },
        method: "POST",
        success: function (data) {
            $('.modal-body').html(`<h3>Анкета удалена</h3>`)
            getPollsArr();
            modalWindow.toggle()
            $('.modal-footer').show();
        },
        error: function (data) {
            console.log(data)
        },
    })
}
$(window).on('load', function () {
    // let modalWindow = new bootstrap.Modal(document.getElementById('myModal'));

    getPollsArr()

})



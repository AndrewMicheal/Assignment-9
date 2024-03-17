var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var tBody = document.getElementById("tBody");
var modal = document.getElementById("modal");
var btnUpdate = document.getElementById("btnUpdate");
var btnAdd = document.getElementById("btnAdd");
var closeIcon = document.getElementById("closeIcon");
var allInputs = document.querySelectorAll(".form-control");
var bookmarks;
var bookMarkIndex;

if(localStorage.getItem("bookmarks") == null) {
    bookmarks = [];
} else {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    getAllBookmarks();
}

function getName(siteNameValue) {
    if(isSiteNameValid(siteNameValue)) {
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
    } else {
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid");
    }
}

function getUrl(siteURLValue) {
    if(isSiteURLValid(siteURLValue)) {
        siteURL.classList.add("is-valid");
        siteURL.classList.remove("is-invalid");
    } else {
        siteURL.classList.add("is-invalid");
        siteURL.classList.remove("is-valid");
    }
}


function submit() {
    if((siteName.value == "" || siteURL.value == "") || (!isSiteNameValid(siteName.value) || !isSiteURLValid(siteURL.value))) {
        openModal();
        return;
    }
    var bookmark = {
        name : siteName.value ,
        url : siteURL.value
    }
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks" , JSON.stringify(bookmarks));
    getAllBookmarks();
    clearInputs();
}

function deleteBookmark(id) {
    bookmarks.splice(id , 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    getAllBookmarks();
}

function updateBookmark() {
    if((siteName.value == "" || siteURL.value == "") || (!isSiteNameValid(siteName.value) || !isSiteURLValid(siteURL.value))) {
        openModal();
        return;
    }
    bookmarks[bookMarkIndex].name = siteName.value;
    bookmarks[bookMarkIndex].url = siteURL.value;
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    getAllBookmarks();
    clearInputs();
    btnUpdate.classList.replace("d-block" , "d-none");
    btnAdd.classList.replace("d-none" , "d-block");
}

function getInputsData(index) {
    siteName.value = bookmarks[index].name;
    siteURL.value = bookmarks[index].url;
    btnUpdate.classList.replace("d-none" , "d-block");
    btnAdd.classList.replace("d-block" , "d-none");
    bookMarkIndex = index;
}

function getAllBookmarks() {
    var bookmarksContainer = ``;
    for(var i = 0; i < bookmarks.length; i++) {
        bookmarksContainer += `<tr>
                                    <td>${i}</td>
                                    <td>${bookmarks[i].name}</td>
                                    <td> <button class="btn btn-visit" onclick = visitURL(${i})><i class="fa-regular fa-eye me-1"></i>Visit</button> </td>
                                    <td> <button class="btn btn-success" onclick = getInputsData(${i})><i class="fa-solid fa-arrows-rotate me-1"></i>Update</button> </td>
                                    <td><button class="btn btn-danger text-white" onclick = deleteBookmark(${i})> <i class="fa-solid fa-trash me-1"></i>Delete</button></td>
                               </tr>`
    }
    tBody.innerHTML = bookmarksContainer;
}

function visitURL(index) {
    var regex = /https:\/\//;
    window.open(`https://${bookmarks[index].url.replace(regex , '')}` , "target");
}

function clearInputs() {
    for(var i = 0; i < allInputs.length; i++) {
        allInputs[i].value = "";
        allInputs[i].classList.remove("is-valid");
    }
}

function closeModal() {
    modal.classList.replace("d-block", "d-none");
}

function openModal() {
    modal.classList.replace("d-none", "d-block");
}

function isSiteNameValid(siteNameValue) {
    var siteNameRegex = /^[a-zA-Z]{3,}\s*([a-zA-Z]+)*$/;
    if(siteNameRegex.test(siteNameValue))
        return true;
    else
        return false;
}

function isSiteURLValid(siteURLValue) {
    var siteURLRegex = /^([a-zA-Z]+\.[a-z]+)|(https:\/\/www\.[a-zA-Z]+\.[a-z]+)|(www\.[a-zA-Z]+\.[a-z]+)|(https:\/\/[a-zA-Z]+\.[a-z]+\/*)|(https:\/\/[a-zA-Z]+(\d+)*\.[a-z]+\/*)|(https:\/\/www\.[a-zA-Z]+(\d+)*\.[a-z]+\/*)$/;
    if(siteURLRegex.test(siteURLValue))
        return true;
    else
        return false;
} 

document.onkeydown = function (e) {
    if(e.key == "Escape") {
        if(!modal.classList.contains("d-none"))
            modal.classList.replace("d-block", "d-none");
    }
}
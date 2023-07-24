var BookmarkName = document.getElementById('bookmarkName')
var bookmarkUrl = document.getElementById('bookmarkUrl')
var submitBtn = document.getElementById('submitBtn')
var tableContent = document.getElementById('tableContent')


var bookmarkList = []
if(localStorage.getItem('bookmarkList') != null) {
    bookmarkList = JSON.parse(localStorage.getItem('bookmarkList'))
    display(bookmarkList)
}

submitBtn.onclick = function() {
    addBookmark()
}

function addBookmark() {
        if(bookmarkNameValidation) {
            var bookmark = {
                siteName: BookmarkName.value,
                siteUrl: bookmarkUrl.value
            }
            bookmarkList.push(bookmark) //store data
            localStorage.setItem('bookmarkList',JSON.stringify(bookmarkList))
            display()
            clearInput()
            bookmarkUrlValidation()
        }

        else {
            alert('invalid bookmark name')
        }
    
}

function display() {
    var newBookmark = ''
    for(var i = 0 ; i < bookmarkList.length ; i++) {
        newBookmark += `
        <tr>
        <td>${i + 1}</td>
        <td>${bookmarkList[i].siteName}</td>
        <td><a href="${i}"><button class="visit-btn"><i class="fa-solid fa-eye pe-2"></i>Visit</button></a></td>
        <td><button onclick="deleteBookmark(${i})" class="delete-btn"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        </tr>
        `
    }
    tableContent.innerHTML = newBookmark
}

function clearInput() {
    BookmarkName.value = ''
    bookmarkUrl.value = ''
}

function deleteBookmark(index) {
    bookmarkList.splice(index,1)
    localStorage.setItem('bookmarkList',JSON.stringify(bookmarkList))
    display(bookmarkList)
}

function bookmarkNameValidation() {
    var nameRegex = /^[A-Z][a-z]{2,8}$/
    if(nameRegex.test(BookmarkName.value)) {
        return true
    }
    else {
        return false
    }
}
var URLInput = bookmarkUrl.value
function bookmarkUrlValidation(URLInput) {
    var urlRegex = /^https?\/\//g
    if(urlRegex.test(URLInput)) {
        return true
    }
    else {
        return false
    }
}




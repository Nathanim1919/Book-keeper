const close = document.getElementById('close');
const add = document.getElementById('add');
const modal = document.getElementById('modal');
const btn = document.getElementById('btn');
const closemodal = document.getElementById('closemodal');
const wname = document.getElementById('websitename');
const wurl = document.getElementById('websiteurl');
const container = document.getElementById('container');
const form = document.querySelector('form');


let mybookmarks = [];


add.addEventListener('click',showModal);
btn.addEventListener('click',addBookmark)
closemodal.addEventListener('click',closemodals);
window.addEventListener('click',(e)=>{(e.target === modal? modal.classList.remove('showmodal'):false)});

fetchBookmarks();


function showModal() {
    modal.classList.add('showmodal');  
}


function closemodals() {
    modal.classList.remove('showmodal');
}


function validate(namevalue,urlvalue) {
        const validates = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
        const regExp = new RegExp(validates);
        if (!namevalue || !urlvalue) {
            return false;
        }
        if (urlvalue.match(regExp)) {
        return true;
        }

        if (!urlvalue.match(regExp)) {
            return false;
        }
}


function addBookmark(e) {
        e.preventDefault();
        let namevalue = wname.value;
        let urlvalue = wurl.value;

        if (!urlvalue.includes('http://','https://')) {
            urlvalue = `http://${urlvalue}`;
        }
        if (!validate(namevalue,urlvalue)) {
        return false
        }
        const bookmarks = {
            name:namevalue,
            url:urlvalue,
        }
        mybookmarks.push(bookmarks);
        localStorage.setItem('mybookmarks',JSON.stringify(mybookmarks));
        fetchBookmarks();
        wname.focus();
        form.reset();
}



function build() {
    container.textContent = '';
        mybookmarks.forEach((bookmarks)=>{
            const {name,url} = bookmarks;

            const container = document.querySelector('.bookmark-container');
            const item = document.createElement('div');
            item.classList.add('item');
            const icon = document.createElement('i');
            icon.setAttribute('class','fa-solid fa-times');
            icon.setAttribute('onclick',`deleteBookmark('${url}')`);
            const link = document.createElement('a');
            link.setAttribute('href',`${url}`)
            link.textContent = `${name}`;
            link.setAttribute('target','_blank');
            item.append(icon,link);
            container.appendChild(item);
        })
}



function fetchBookmarks() {
    if (localStorage.getItem('mybookmarks')) {
       mybookmarks = JSON.parse(localStorage.getItem('mybookmarks'));
    }else{
        mybookmarks = [
            {
                name:'nathanim',
                url:'nathan.com',
            },
        ];
    }

    build();
}




function deleteBookmark(url){
    mybookmarks.forEach((bookmark, i)=>{
        if (bookmark.url === url) {
            mybookmarks.splice(i,1);
        }
    })

    localStorage.setItem('mybookmarks',JSON.stringify(mybookmarks));
    fetchBookmarks();
}


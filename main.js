let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category'); 
let submitButton = document.getElementById('submit');
let serchBytitle = document.getElementById('searchtitle');
let serchBycategory = document.getElementById('searCategory');
let Searchbtn = document.getElementById('Search');

let mood ="create"
let up ;
// showcount
function showcount (){
    if (price.value!=='') {
        let result = (+price.value + +taxes.value + +ads.value )-+discount.value ;
        total.innerHTML=result;
        total.style.background = '#27ae60';
    }else{
        total.innerHTML='';
        total.style.background = '#e74c3c';
    }
}
price.onkeyup = showcount;
taxes.onkeyup = showcount;
ads.onkeyup = showcount;
discount.onkeyup = showcount;

let arrayofdata= [];
if (window.localStorage.getItem("product")) {
    arrayofdata=JSON.parse(window.localStorage.getItem("product"))
}

submitButton.onclick = function () {
    const product ={
        id:arrayofdata.length+1,
        title : title.value.toLowerCase(),
        price :price.value,
        ads :ads.value,
        taxes : taxes.value,
        discount: discount.value,
        total : total.innerHTML,
        category : category.value.toLowerCase(),
        count : count.value

    }
    // console.log(product);
    if (title.value !=''&& price.value!=''&& price.value!='' && product.count<100 && category.value!='') {
        
        if (mood==="create") {
            
            if (product.count>1) {
                for (let i = 0; i < product.count; i++) {
                    
                    arrayofdata.push(product);  
                    
                }
            }else{
                 arrayofdata.push(product);
            } 
             
        }else{
            arrayofdata[up]=product;
            mood= "create";
            submitButton.innerHTML="Create";
            count.style.display='block'
        }
        clearInput()
    }
    
    console.log(arrayofdata);
    localStorage.setItem( "product" , JSON.stringify(arrayofdata));
    // localStorage.clear()
    
    getData()
}

function clearInput() {
    title.value ='';
    price.value ='';
    ads.value ='';
    category.value ='';
    taxes.value ='';
    total.innerHTML ='';
    total.style.background = '#e74c3c';
    count.value ='';
    discount.value ='';
}
let delall ;
function getData() {
    let table ='';
    for (let i = 0; i < arrayofdata.length; i++) {
        table+=
        `<tr>
            <td>${i+1}</td>
            <td>${arrayofdata[i].title}</td>
            <td>${arrayofdata[i].price}</td>
            <td>${arrayofdata[i].taxes}</td>
            <td>${arrayofdata[i].ads}</td>
            <td>${arrayofdata[i].discount}</td>
            <td>${arrayofdata[i].total}</td>
            <td>${arrayofdata[i].category}</td>
            <td><button id="Update" onclick=update(${i})>Update</button></td>
            <td><button id="Delete" onclick=deletedata(${i})>Delete</button></td>
        </tr>`
    }
    let btn = document.getElementById('deleteAll')
    if (arrayofdata.length > 0) {
        btn.innerHTML = '';
        delall = document.createElement('button');
        delall.appendChild(document.createTextNode(`Delete All (${arrayofdata.length})`));
        delall.className='deletall'
        delall.onclick = deleteall
        btn.appendChild(delall);
    }else{
        btn.innerHTML=''
    }
    document.getElementById('tbody').innerHTML= table;
}

getData();
// delete product 

function deletedata(i) {
    arrayofdata.splice(i,1);
    localStorage.product = JSON.stringify(arrayofdata);
    getData()
}


function deleteall() {
    window.localStorage.clear();
    arrayofdata = []; // delete data from array
    getData(); // refresh show data
    
}
//update data
function update(i) {
    title.value = arrayofdata[i].title;
    taxes.value = arrayofdata[i].taxes;
    price.value = arrayofdata[i].price;
    ads.value = arrayofdata[i].ads;
    discount.value = arrayofdata[i].discount;
    showcount()
    count.style.display='none'
    submitButton.innerHTML='Update'
    category.value = arrayofdata[i].category;
    mood="update";
    up=i
    scroll({
        top : 0,
        behavior:"smooth"
    })
}


//search Methoth

let searchmode = 'title';
// serchBytitle.onclick = function() { getSearchMood(this.id); };
// serchBycategory.onclick = function() { getSearchMood(this.id); };

serchBytitle.onclick = ()=>getSearchMood(serchBytitle.id);
serchBycategory.onclick = ()=>getSearchMood(serchBycategory.id);
function getSearchMood(id){
if (id == 'searchtitle') {
    searchmode = 'title';
}else{
    searchmode = 'Category'
}
Searchbtn.focus();
Searchbtn.placeholder = `Search By ${searchmode}`;
Searchbtn.value='';
getData()


}
Searchbtn.onkeyup = function() { searchMethod(this.value); };
//Searchbtn.onkeyup = ()=>searchMethod(Searchbtn.value);

function searchMethod(val) {
    let table ='';
    if (searchmode == 'title') {
        for (let i = 0; i < arrayofdata.length; i++) {
             if (arrayofdata[i].title.includes(val.toLowerCase())) {
                table+=
                `<tr>
                    <td>${i+1}</td>
                    <td>${arrayofdata[i].title}</td>
                    <td>${arrayofdata[i].price}</td>
                    <td>${arrayofdata[i].taxes}</td>
                    <td>${arrayofdata[i].ads}</td>
                    <td>${arrayofdata[i].discount}</td>
                    <td>${arrayofdata[i].total}</td>
                    <td>${arrayofdata[i].category}</td>
                    <td><button id="Update" onclick=update(${i})>Update</button></td>
                    <td><button id="Delete" onclick=deletedata(${i})>Delete</button></td>
                </tr>`
                
            }
            
        }
    }else{
        for (let i = 0; i < arrayofdata.length; i++) {
            if (arrayofdata[i].category.includes(val.toLowerCase())) {
               table+=
               `<tr>
                   <td>${i+1}</td>
                   <td>${arrayofdata[i].title}</td>
                   <td>${arrayofdata[i].price}</td>
                   <td>${arrayofdata[i].taxes}</td>
                   <td>${arrayofdata[i].ads}</td>
                   <td>${arrayofdata[i].discount}</td>
                   <td>${arrayofdata[i].total}</td>
                   <td>${arrayofdata[i].category}</td>
                   <td><button id="Update" onclick=update(${i})>Update</button></td>
                   <td><button id="Delete" onclick=deletedata(${i})>Delete</button></td>
               </tr>`
               
            }
           
        }
    }
    document.getElementById('tbody').innerHTML= table;
}
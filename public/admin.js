async function bkTracker(){ //should gt books and change them after with showBook

    let response = await fetch('http://localhost:3001/listBooks') //This allows us to pull the book database from the server
    let books = await response.json() //the list of books stored in the book variable
    
    books.forEach(showBook)
}

function showBook(book){
    let root = document.querySelector('#root');

    let li = document.createElement('li'); 
    li.textContent = book.title; 

    let inventory = document.createElement('input')//update qnty of books in text space
    inventory.value = book.quantity;

    let saveBtn = document.createElement('button')//make button to submit update
    saveBtn.textContent = 'Save';//call it save

    saveBtn.addEventListener("click", () =>{
        fetch('http://localhost:3001/updateBook', {
            method: "PATCH",
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ //items to patch to the json
                "id": book.id, //book id's dont get patched but its needed for the request to even work
                "quantity": inventory.value // what we really want to patch is the inventory
            })
        });
    });

    li.append(inventory, saveBtn);
    root.append(li);
}
bkTracker(); //this is the call that should get the function running
// Your Code Here
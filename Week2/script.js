// console.log("hello");
// window.addEventListener('scroll', ()=> {
//   console.log(window.scrollY, document.body.scrollHeight, window.innerWidth, window.innerHeight, window.scrollY *(window.innerWidth/window.innerHeight));
// })

window.addEventListener("load", () => {
    console.log("hello");

    window.addEventListener('scroll', ()=> {
      console.log(window.scrollY, document.body.scrollHeight, window.innerWidth, window.innerHeight, window.scrollY *(window.innerWidth/window.innerHeight));
    })

    let M_inputBox = document.getElementById("morning__input");

    //add item to list when entered in the input box
    M_inputBox.addEventListener("change", (m) => {
      
      //create the required elements
      let M_list = document.getElementById("morning__list");
      let M_listItem = document.createElement("mli");
      let M_listContent = document.createElement("mp");
  
      //give the list item the required values
      M_listContent.innerHTML = m.target.value;
      let M_listId = m.target.value.replace(/\s/g, '');
      M_listItem.classList.add("list__item");
      M_listItem.id = M_listId;
  
      M_list.appendChild(M_listItem);
      M_listItem.appendChild(M_listContent);
      M_inputBox.value = "";
  
    });

    let A_inputBox = document.getElementById("afternoon__input");
    
    //add item to list when entered in the input box
    A_inputBox.addEventListener("change", (a) => {
      
      //create the required elements
      let A_list = document.getElementById("afternoon__list");
      let A_listItem = document.createElement("ali");
      let A_listContent = document.createElement("ap");
  
      //give the list item the required values
      A_listContent.innerHTML = a.target.value;
      let A_listId = a.target.value.replace(/\s/g, '');
      A_listItem.classList.add("list__item");
      A_listItem.id = A_listId;
  
      A_list.appendChild(A_listItem);
      A_listItem.appendChild(A_listContent);
      A_inputBox.value = "";
  
    });

    let E_inputBox = document.getElementById("evening__input");
    
    //add item to list when entered in the input box
    E_inputBox.addEventListener("change", (e) => {
      
      //create the required elements
      let E_list = document.getElementById("evening__list");
      let E_listItem = document.createElement("eli");
      let E_listContent = document.createElement("ep");
  
      //give the list item the required values
      E_listContent.innerHTML = e.target.value;
      let E_listId = e.target.value.replace(/\s/g, '');
      E_listItem.classList.add("list__item");
      E_listItem.id = E_listId;
  
      E_list.appendChild(E_listItem);
      E_listItem.appendChild(E_listContent);
      E_inputBox.value = "";
  
    });

    let N_inputBox = document.getElementById("night__input");
    
    //add item to list when entered in the input box
    N_inputBox.addEventListener("change", (n) => {
      
      //create the required elements
      let N_list = document.getElementById("night__list");
      let N_listItem = document.createElement("nli");
      let N_listContent = document.createElement("np");
  
      //give the list item the required values
      N_listContent.innerHTML = n.target.value;
      let N_listId = n.target.value.replace(/\s/g, '');
      N_listItem.classList.add("list__item");
      N_listItem.id = N_listId;
  
      N_list.appendChild(N_listItem);
      N_listItem.appendChild(N_listContent);
      N_inputBox.value = "";
  
    });
    
  })
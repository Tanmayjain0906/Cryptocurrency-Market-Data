



let view = "grid";
let gridButton = document.getElementById("grid");
let listButton = document.getElementById("list");

gridButton.classList.add("active");
fetchData();

gridButton.addEventListener("click", () => {
  view = "grid";
  gridButton.classList.add("active");
  listButton.classList.remove("active");
  fetchData();
})

listButton.addEventListener("click", () => {
  view = "list";
  listButton.classList.add("active");
  gridButton.classList.remove("active");
  fetchData();
})

let container = document.getElementsByClassName("container")[0];
let str = "$";
async function fetchData() {
  let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";

  let prom = await fetch(url);
  let data = await prom.json();

  loadData(data);
}

function loadData(data) {
  container.innerHTML = ``;
  if (view === "grid") {
    for (let i = 0; i < data.length; i++) {
      let card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `<div id="head">
  
       <div class="currency-img">
         <img src=${data[i].image} alt="" width="40px">
       </div>
       
       <div id="name">
       ${data[i].symbol.toUpperCase()}
         <div id="caption">
             ${data[i].name}
          </div>
       </div>
     
     </div>
     
     <div id="percent">
       
         <div class="per-btn" ${data[i].price_change_percentage_24h>0?`style="color:greenyellow;"`:`style="color:red; "`}>${data[i].price_change_percentage_24h} %</div>
     
     </div>
     
     <div id="price" ${data[i].current_price>0?`style: "color: greenyellow"`:`style: "color: red"`}>
     <i class="fa-solid fa-dollar-sign" style="color: #75E338;"></i>
     ${data[i].current_price}
        
         
     </div>
     
     <div id="volume">
       
         Total Volume: ${data[i].total_volume}
     
     </div>
     
     <div id="cap">
         
         Market Cap: <i class="fa-solid fa-dollar-sign" style="color: #7F7F71;"></i>${data[i].market_cap}
     
     </div>`
      
    
      container.appendChild(card);
      

    }
  }
  else {
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    thead.className = "table-head";
   

    table.appendChild(thead);

    let tbody = document.createElement("tbody");

    for (let i = 0; i < data.length; i++) {
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement("td");
      let td5 = document.createElement("td");

      td1.innerHTML = `<div id="head">
  
      <div class="currency-img">
        <img src=${data[i].image} alt="" width="40px">
      </div>
      
      <div id="name">
        ${data[i].symbol.toUpperCase()}
        <div id="caption">
            ${data[i].name}
         </div>
      </div>
    
    </div>`

    td1.colSpan = "2";

      td2.innerHTML = `<div id="percent" ${data[i].price_change_percentage_24h>0?`style="color:greenyellow; border: 1px solid greenyellow"`:`style="color:red; border: 1px solid red"`}>
       
    <div class="per-btn">${data[i].price_change_percentage_24h}</div>

</div>`
      td1.className = "td-1";

      td3.innerHTML = ` <div id="price" ${data[i].current_price>0?`style: "color: greenyellow"`:`style: "color: red"`}>
      <i class="fa-solid fa-dollar-sign" style="color: #75E338;"></i>
      ${data[i].current_price}
         
          
      </div>`

      td4.innerHTML = ` <div id="volume">
       
      ${data[i].total_volume}
  
  </div>`

      td5.innerHTML = ` <div id="cap">
         
       <i class="fa-solid fa-dollar-sign" style="color: #7F7F71;"></i>${data[i].market_cap}
  
  </div>`

      tr.append(td1, td2, td3, td4, td5);
      tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    document.body.appendChild(table);
  }
}


let cards = document.getElementsByClassName("card");
let moon = document.getElementsByClassName("fa-solid")[0];
let viewMode = "dark";
let h4 = document.getElementsByTagName("h4")[0];


moon.addEventListener("click", ()=> {
  if(viewMode === "dark")
  {
    moon.classList.remove("fa-moon");
    moon.classList.add("fa-sun");
    viewMode = "light";
    moon.style.color = "black";
    moon.style.transition = "0.5s";
    document.body.style.backgroundColor = "white";
    h4.style.color = "black";
    gridButton.style.backgroundColor = "white";
    listButton.style.backgroundColor = "white";
    gridButton.style.color = "black";
    listButton.style.color = "black";

    for(let i=0;i<cards.length;i++)
    {
      cards[i].style.backgroundColor = "pink";
    }
    
  }
  else
  {
    moon.classList.add("fa-moon");
    moon.classList.remove("fa-sun");
    viewMode = "dark";
    moon.style.color = "white";
    moon.style.transition = "0.5s";
    document.body.style.backgroundColor = "black";
    h4.style.color = "white";

    gridButton.style.backgroundColor = "black";
    listButton.style.backgroundColor = "black";
    gridButton.style.color = "white";
    listButton.style.color = "white";
    for(let i=0;i<cards.length;i++)
    {
      cards[i].style.backgroundColor = "#2b2a2a";
    }
    
  }
 
})
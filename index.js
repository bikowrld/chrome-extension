let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const errorMessageEl = document.getElementById("error-message");
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){ 
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})
function render(leads) {
        let listItems = ""
        for (let i = 0; i < leads.length; i++) {
            listItems += `
                <li>
                    <a target='_blank' href='${leads[i]}'>
                        ${leads[i]}
                    </a>
                    <button class="delete-button"; ">Delete</button>
                </li>
            `
        }
        ulEl.innerHTML = listItems
}

ulEl.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-button")) {
        const listItem = event.target.closest("li");
        const index = Array.from(ulEl.children).indexOf(listItem);

        if (index !== -1) {
            myLeads.splice(index, 1);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render(myLeads);
        }
    }
});

inputBtn.addEventListener("click", function() {
    const inputValue = inputEl.value;
    if (!inputValue) {
        errorMessageEl.textContent = "Please provide a valid input.";
    } else {
        myLeads.push(inputValue);
        inputEl.value = "";
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        errorMessageEl.textContent = ""; 
        render(myLeads);
    }
});

inputEl.addEventListener("input", function() {
    errorMessageEl.textContent = "";
});

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
});








let choose_member = document.getElementById("choose_member");
let borrow_date = document.getElementById("borrow_date");
let due_date = document.getElementById("due_date");
let due_label = document.getElementById("due_label");
let due_div = document.getElementById("due_div");
let return_date = document.getElementById("return_date");
let submit = document.getElementById("submit");
let output = document.getElementById("output");
let success = document.getElementById("success");
let overDue = document.getElementById("overDue");

let track_member = "";
let selected_member = null;
let selected_brw_date = new Date();
let showDue_date = new Date();
let showReturn_date = new Date();
let today = new Date();
let click_submit = 0;

// Set initial date
window.addEventListener("load",(event) => {

    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2,'0');
    let date = String(today.getDate()).padStart(2,'0');
    today_date = `${year}-${month}-${date}`;
    borrow_date.value = today_date;
})

choose_member.addEventListener("change", function(event) {

    track_member = event.target.value;
    if(click_submit > 0) {
        resetOutput();
    }
    if(track_member == "under_grade") {
        selected_member = 1;
    }
    else if(track_member == "post_grade") {
        selected_member = 2;
    }
    else if(track_member == "teacher") {
        selected_member = 3;
    }
    else {
        selected_member = null;
    }

    if(selected_member !== null && borrow_date.value != "") {
        showDue_date = new Date(borrow_date.value);
        calculateDueDate();
    }
})

borrow_date.addEventListener("change", function(event) {

    selected_brw_date = new Date(event.target.value);
    showDue_date = new Date(selected_brw_date);

    if(click_submit > 0) {
        resetOutput();
    }
    if( selected_member !== null) {
        calculateDueDate();
    }

})

return_date.addEventListener("change", function() {
    if(click_submit > 0) {
        resetOutput();
    }
})

// Output date logic
function calculateDueDate() {
    if(selected_member == 1) {
        showDue_date.setDate(showDue_date.getDate() + 7);
    }
    else if(selected_member == 2) {
        showDue_date.setDate(showDue_date.getDate() + 14);
    }
    else if (selected_member == 3) {
        showDue_date.setDate(showDue_date.getDate() + 30);
    }

    due_div.classList.remove("hide");
    due_label.classList.remove("hide");
    due_date.classList.remove("hide");
    due_date.style.fontSize = "13px";
    due_date.innerHTML = `วันที่ ${showDue_date.getDate()} เดือนที่ ${showDue_date.getMonth()+1} ${showDue_date.getFullYear()}`;
}

// Submit validation
submit.addEventListener("click",function() {

    click_submit = parseInt(click_submit) + 1;

    let date1 = new Date(borrow_date.value);
    let date2 = new Date(return_date.value);
    let overdue_day = (date2 - showDue_date) / 86400000;

    if(selected_member == null || borrow_date.value == "" || return_date.value == "") {
        alert("Invalid form submission!");
    }
    else if(date2 < date1) {
        alert("วันที่มาคืนไม่สามารถเป็นวันก่อนหน้าวันที่ยืมได้");
        return_date.value = "";
    }
    else {
        output.classList.remove("hide");
        success.classList.remove("hide");
        if(showDue_date < date2) {
            overDue.classList.remove("hide");
            overDue.innerHTML = `คืนเกินกำหนด ${Math.abs(overdue_day)} วัน จะต้องจ่ายค่าปรับ ` + Math.abs(overdue_day*10) + ` บาท`;
            overDue.style.color = "red";
        }
        else {
            overDue.innerHTML = "";
        }
    }
})

// Reset output 
function resetOutput() {
    output.classList.add("hide");
    success.classList.add("hide");
    overDue.classList.add("hide");
}
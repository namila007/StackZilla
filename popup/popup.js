$('document').ready(function(){
    browser.runtime.sendMessage({
        command: "getToken"
    }).then((res)=>{
        console.log("inbox " +res)}
    )
    
});

function handleError(error) {
    console.log(`Error: ${error}`);
}

function handleinbox(message) {
    console.log("POP")
    console.log(message.data)
}

document.getElementById('showinboxbtn').addEventListener("click",()=>{
    console.log("clicked")
    var inbox = document.getElementById("messages")
    if(inbox.style.visibility == 'hidden') {
        inbox.style.visibility = 'visible'
    }else {
        inbox.style.visibility = 'hidden'
    }
})
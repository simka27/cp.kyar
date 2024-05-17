let open = document.getElementsByTagName("button");
function showMessage() {
    alert("Свяжитесь с нами для получения подробной информации");
}
for (let i = 0; i < open.length; i++) {
    open[i].addEventListener("click", function () {
        showMessage();
    });
}
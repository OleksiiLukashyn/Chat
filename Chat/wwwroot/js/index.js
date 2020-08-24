// соединение
const connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

connection.start()
    .catch(function (err) {
        return console.error(err.toString());
    });

// вызов серверного метода
document.getElementById("sendButton").addEventListener("click", (e) => {
    const textEl = document.getElementById("Text");
    if (!textEl.value || !textEl.value.trim())
        return

    connection.invoke("SendToAll", textEl.value)
        .catch(function (err) {
            return console.error(err.toString());
        });
    textEl.value = "";
});

// прием ответа от сервера
connection.on("ReceiveMessage", function (text, sign, when) {
    // to prevent markup
    text = text.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");

    const divEl = document.createElement('div');
    divEl.innerHTML =
        `<div style="font-size:larger">${text}</div>` +
        `<div style="font-size: smaller">${sign} --- ${when}</div>`;
    document.getElementById("bottom").before(divEl);
});
async function send() {
    const url = '/?handler=Ajax';
    const text = document.getElementById("Text").value;
    let formData = new FormData();

    formData.append("text", text);

    let xsrf_token = document.getElementsByName("__RequestVerificationToken")[0].value;

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            credentials: 'include',
            headers: { "XSRF-TOKEN": xsrf_token }
        });
        if (response.status === 200) {
            const json = await response.json();
            add_message(text, json.userName);
        }
        else {
            const text = await response.text();
            alert(text);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

function add_message(text, userName) {
    var html = `<div style="font-size:larger">${text}</div>
      <div style="font-size: smaller">${userName} --- Now</div>`;

    var item = document.createElement("div");
    item.innerHTML = html;
    document.getElementById("bottom").before(item);
}
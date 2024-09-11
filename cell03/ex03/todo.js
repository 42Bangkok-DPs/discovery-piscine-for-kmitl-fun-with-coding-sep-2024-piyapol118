function handleAdd() {
    let form = prompt("create new list");

    if (form != null) {
        let new_div = document.createElement("div");
        let text = document.createTextNode(form);
        new_div.append(text);
        new_div.onclick = () => handleDel(new_div);
        document.getElementById("ft_list").appendChild(new_div);
        saveToCookie();
    }
}

const handleDel = (item) => {
    if (confirm("ลบจริงรึท่าน (Are you sure to delete this?")) {
        item.remove(); 
        saveToCookie();
    }
}

const saveToCookie = () => {
    const ftList = document.getElementById("ft_list");
    const items = Array.from(ftList.children).map(div => div.textContent.trim());
    const json = JSON.stringify(items);
    document.cookie = `ft_list=${encodeURIComponent(json)}; path=/; max-age=86400`; 
};

const loadFromCookie = () => {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(cookie => cookie.startsWith('ft_list='));
    if (cookie) {
        let json = decodeURIComponent(cookie.split('=')[1]);
        let items = JSON.parse(json);
        let ftList = document.getElementById("ft_list");
        items.forEach(item => {
            let new_div = document.createElement("div");
            let text = document.createTextNode(item);
            new_div.append(text);
            new_div.onclick = () => handleDel(new_div);
            document.getElementById("ft_list").appendChild(new_div);
            ftList.appendChild(new_div);
        });
    }
};

const init = () => {
    loadFromCookie();
};

document.addEventListener("DOMContentLoaded", init);
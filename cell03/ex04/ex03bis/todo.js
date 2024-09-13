function handleAdd() {
    let form = prompt("create new list");
    if (form != null) {
        let new_div = $("<div>").text(form);
        new_div.on("click", function() {
            handleDel(new_div);
        });
        $("#ft_list").append(new_div);
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
    const items = $("#ft_list").children().map(function() {
        return $(this).text().trim();
    }).get();
    const json = JSON.stringify(items);
    document.cookie = `ft_list=${encodeURIComponent(json)}; path=/; max-age=86400`; 
};

const loadFromCookie = () => {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(cookie => cookie.startsWith('ft_list='));
    if (cookie) {
        let json = decodeURIComponent(cookie.split('=')[1]);
        let items = JSON.parse(json);
        items.forEach(item => {
            let new_div = $("<div>").text(item);
            new_div.on("click", function() {
                handleDel(new_div);
            });
            $("#ft_list").append(new_div);
        });
    }
};

const init = () => {
    loadFromCookie();
};

$(document).ready(function() {
    $("#new_btn").on("click", handleAdd);
    init();
});

function cli(num) {
    if (num.parentNode.getAttribute("flag")) {
        num.parentNode.children[0].click();
        num.parentNode.children[0].onchange = function () {
            num.parentNode.children[2].src = window.URL.createObjectURL(num.parentNode.children[0].files[0]);
            num.parentNode.children[2].setAttribute('class', 'jack');
            num.parentNode.children[1].style.display = "none";
        }
    }
}

function check(num) {
    if (num.parentNode.parentNode.children[0].getAttribute("flag")) {
        num.innerHTML = "修改";
        num.parentNode.parentNode.children[0].setAttribute("flag", "");
        var now = num.parentNode.parentNode.children;
        for (var i = 1; i < 4; i++) {
            now[i].children[0].setAttribute("disabled", "true");
            now[i].children[0].className = "mdd";
        }
    } else {
        num.innerHTML = "确定";
        num.parentNode.parentNode.children[0].setAttribute("flag", "true");
        var now = num.parentNode.parentNode.children;
        for (var i = 1; i < 4; i++)
        {
            now[i].children[0].removeAttribute("disabled");
            now[i].children[0].className = "";
        }
    }
}

function dec(now) {
    now.parentNode.parentNode.remove();
}

function solve(data) {
    var flag = !!data.src;
    var num = document.createElement("tr");
    var ans = "";
    ans += `<td><input type='file' style='display: none'><button class='be' onclick='cli(this)'>上传</button><img onclick='cli(this)' src="${data.src}" class="jack"></td>`;
    ans += `<td><input type="text" class="${flag ? "mdd" : ""}" value='${data.name}' ${flag ? 'disabled' : ''}></td>`;
    ans += `<td><input type="text" class="${flag ? "mdd" : ""}" value='${data.category}' ${flag ? 'disabled' : ''}></td>`;
    ans += `<td><input type="text" class="${flag ? "mdd" : ""}" value="${data.score}" ${flag ? 'disabled' : ''}></td>`;
    ans += `<td><button class="rd" onclick="dec(this)">删除</button><br><button class="be" onclick="check(this)">${flag ? "修改" : "确定"}</button></td>`;
    num.innerHTML = ans;
    if (flag) num.children[0].children[1].style.display = "none";
    if (!flag) {
        num.children[0].setAttribute("flag", "true");
    }
    return num;
}

function add(data = {
    src: '',
    name: '',
    category: '',
    score: ''
}) {
    document.getElementsByTagName("tbody")[0].append(solve(data));
}
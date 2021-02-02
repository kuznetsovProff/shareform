//window.onload = () => {
// вспомогательная функция для вывода текста нк странице
let log = (m) => {
    var msg = m.toString();
    var div = document.createElement('div');
    div.innerHTML = "<span>" + msg + "</span>";
    document.body.appendChild(div);
};

let f = _.matches('hello');

log('world:' + f('world'));
log('hello:' + f('hello'));
//}
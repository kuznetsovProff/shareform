// log
function log(msg) {
    const now = new Date();
    const timestr = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString();
    console.log(timestr + '::' + msg);
}

// promisify(f, true) для массива результатов
export function promisify(f, manyArgs = false) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            function callback(err, ...results) { // колбэк для f
                if (err) {
                    return reject(err);
                } else {
                    resolve(manyArgs ? results : results[0]);
                }
            }

            args.push(collback);

            f.call(this, ...args);
        });
    };
};

export function url() {
    /* let url = new URL(document.location.href); let paramsString = document.location.search; let searchParams = new URLSearchParams(paramsString); for (let pair of searchParams.entries())
        { console.log(pair[0] + ', ' + pair[1]); if (pair[0] == 'ospname') { $('#ospname').text(pair[1]); }; };*/
}

export function list(json_list) {
    let list = [];

    const tasksJson = $.getJSON(json_list)
        .done(function(data) {
            log('list.json done');
            $.each(data, function(key, val) {
                list.push(val);
            });
        })
        .fail(function() {
            log('list.json fail');
        })
        .always(function() {
            log('list.json always')
        });

}

export function menu(json_menu) {
    // url
    let url = new URL(document.location.href);

    let elts = {};

    const menuJson = $.getJSON(json_menu)
        .done(function(data) {
            log('menu.json done');

            $('<div/>', {
                'id': 'topnavbarback',
                'class': 'no-print',
                'html': '<div class="undernavbarsection"></div>'
            }).appendTo('#container');

            elts = data;

            // добавление меню

            $.each(elts, function(key, val) {
                // добавление bs4 navbar
                if (key == 'menuon') {
                    if (val == 'true') {
                        $('<nav/>', {
                            'id': 'topnavbar',
                            'class': 'navbar navbar-expand-sm bg-success navbar-dark fixed-top blockshadow no-print navbar-expand-md'
                        }).appendTo('#header');

                        $('<a/>', {
                            'class': 'navbar-brand text-center',
                            'href': '/',
                            'html': '<span class="text-dark">SHARE</span> <span class="text-light"><i class="far fa-file-alt"></i> FORM</span>',
                        }).appendTo('#topnavbar');

                        $('<button/>', {
                            'class': 'navbar-toggler',
                            'type': 'button',
                            'data-toggle': 'collapse',
                            'data-target': '#navbarNav',
                            'html': '<span class="navbar-toggler-icon"></span>',
                        }).appendTo('#topnavbar');

                        // menu
                        $('<div/>', {
                            'class': 'collapse navbar-collapse',
                            'id': 'navbarNav',
                        }).appendTo('#topnavbar');

                        $('<ul/>', {
                            'class': 'navbar-nav mr-auto text-center',
                            'html': `<li class="nav-item active"><!--<a class="nav-link" href="#">Каталог</a>--></li>`,
                        }).appendTo('#navbarNav');

                        $('<ul/>', {
                            'id': 'btn_icons',
                            'class': 'navbar-nav text-center',
                        }).appendTo('#navbarNav');
                    } else {}
                } else if (key == 'buttons') {
                    $.each(val, function(key, val) {
                        $('<li/>', {
                            'class': 'nav-item active',
                            'html': '<a id="' + key + '" class="nav-link" data-toggle="tooltip"' +
                                ' title="' + val.title + '" href="#"><i class="' + val.fntawesome + '"><i></a>',
                        }).appendTo('#btn_icons');
                    });
                } else {
                    console.log('неопознанный элемент: ' + key)
                }
                // конец добавление bs4 navbar
            });
            $('#btnlink').on('click', function() {
                $('textarea#link').text(url);
                $('#modallink').modal('show');
            });
            $('#btncopylink').on('click', function() {
                let title = $('title').text();
                Clipboard.copy(url);

                // добавление аргументов к адресной строке
                // необходима проверка параметров url
                let arg = '?arg=copied';
                //var refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + '?arg=1';    
                //window.history.pushState({ path: refresh }, '', refresh);

                history.replaceState(null, null, arg);

                $('title').text(title);

                //window.history.replaceState(null, null, arg);
                url = url + arg;
                $('#modallink').modal('hide');
            });

            $('#btnprint').on('click', function() {
                window.print();
            });

            $("#btnshare").on('click', function() {
                $('div.ya-share2__container.ya-share2__container_size_l').addClass('ya-share2__container_color-scheme_normal ya-share2__container_shape_round');

                $("#modalshare").modal();
            });

            $('[data-toggle="tooltip"]').tooltip();

            $('select.selectpicker').on('change', function() {
                let selected = $('.selectpicker option:selected').val();
                $($(this).attr('change-control')).text(selected);
            });

            $('div[close]').on('click', function() {
                if ($(this).attr('close') == "false") {
                    $(this).attr('close', "true");
                    $(this).html('<i class="no-print fas fa-chevron-right"></i>');
                    $($(this).attr('control')).removeClass('d-inline').addClass('d-none');
                } else {
                    $(this).attr('close', "false");
                    $(this).html('<i class="no-print fas fa-chevron-left"></i>');
                    $($(this).attr('control')).removeClass('d-none').addClass('d-inline');
                }
            });
        })
        .fail(function() {
            log('menu.json fail');
        })
        .always(function() {
            log('menu.json always')
        });
}

// вспомогательная функция: создать элемент формы function 
function addElt(parentid, eltid = '', eltcls = '', elttype = 'div') {
    let elthtml = '';
    if (eltid != '') {
        eltid = ' id="' + eltid + '"';
    }
    if (eltcls != '') {
        eltcls = ' class="' + eltcls + '"';
    }
    elthtml = '<' + elttype + ' ' + eltid + eltcls + '/>';
    let elt = $(elthtml).appendTo(parentid);

    return elt;
};

export function form(json_form) {
    // создание формы

    let frm = {};
    let frmfile = json_form;

    const frmJson = $.getJSON(frmfile)
        .done(function(data) {
            log('form.json done');

            $('<div/>', {
                'id': 'formwrapper',
                'class': 'container'
            }).appendTo('#container');

            frm = data;

            // потом заменить на загружаемую из файла c JSON
            //let frm = $.parseJSON( json_form );

            // разбор json



            if (frm.ver == "0.0.0 b") {
                // проход по разделу с настройками
                $.each(frm.sets, function(key, val) {
                    console.log('settings: ' + key + ':' + val);
                });
                // проход по секциям
                $.each(frm.scs, function(num, val) {
                    // по-умолчанию
                    let wrapperid = "#formwrapper";

                    // атрибуты секции
                    let sectionid = val.id;
                    let sectioncls = val.cls;

                    if (!!val.parentid) {
                        // если указан родитель для секции
                        wrapperid = val.parentid;

                        addElt(wrapperid, sectionid, sectioncls);
                    } else {
                        // по-умолчанию
                        if (sectioncls != '') sectioncls = ' ' + sectioncls;
                        addElt(wrapperid, sectionid, 'row' + sectioncls);
                    }



                    // проход по столбцам
                    $.each(val.cols, function(key, col) {
                        let colid = col.id;
                        let colcls = col.cls;

                        if (colcls != '') colcls = ' ' + colcls;
                        addElt('#' + sectionid, colid, 'col' + colcls);

                        // проход по абзацам
                        $.each(col.ps, function(key, p) {
                            let pid = p.id;
                            let pcls = p.cls;

                            if (!pid) {
                                pid = '';
                            }

                            if (pcls != '' && !!pcls) {
                                pcls = ' ' + pcls;
                            } else {
                                pcls = '';
                            }

                            addElt('#' + colid, pid, 'p' + pcls);

                            // проход по строчкам
                            $.each(p.ss, function(key, s) {
                                let sid = s.id;
                                let scls = s.cls;

                                if (!sid) {
                                    sid = '';
                                }

                                if (scls != '' && !!scls) {
                                    scls = ' ' + scls;
                                } else {
                                    scls = '';
                                }

                                let elt = addElt('#' + pid, sid, 's d-inline' + scls, s.type);

                                if (!!s.txt) elt.text(s.txt);
                                if (!!s.html) elt.html(s.html);
                                if (!!s.editable) elt.attr('contenteditable', s.editable);
                                if (!!s.pholder) elt.attr('placeholder', s.pholder);
                                if (!!s.changec) elt.attr('change-control', s.changec);
                                if (!!s.close) elt.attr('close', s.close);
                                if (!!s.switch) elt.attr('switch', s.switch);
                                if (!!s.control) elt.attr('control', s.control);
                                if (!!s.href) elt.attr('href', s.href);
                                if (!!s.target) elt.attr('target', s.target);
                                if (!!s.datatoggle) elt.attr('data-toggle', s.datatoggle);
                                if (!!s.dataplacement) elt.attr('data-placement', s.dataplacement);
                                if (!!s.title) elt.attr('title', s.title);
                                if (!!s.itype) elt.attr('type', s.itype);
                                if (!!s.value) elt.attr('value', s.value);
                                if (!!s.val) elt.val(s.val);
                                if (!!s.for) elt.attr('for', s.for);
                                if (!!s.name) elt.attr('name', s.name);
                                if (!!s.answer) elt.attr('answer', s.answer);
                                if (!!s.disabled) elt.attr('disabled', s.disabled);
                                if (!!s.formula) elt.attr('formula', s.formula);
                                if (!!s.ops) elt.attr('ops', s.ops);
                                if (!!s.datainputmask) elt.attr('data-inputmask', s.datainputmask);
                                if (!!s.datatoggle) elt.attr('data-toggle', s.datatoggle);
                                if (!!s.datasize) elt.attr('data-size', s.datasize);
                                if (!!s.datawidth) elt.attr('data-width', s.datawidth);
                                if (!!s.dataheight) elt.attr('data-height', s.dataheight);
                                if (!!s.datastyle) elt.attr('data-style', s.datastyle);
                                if (!!s.dataonstyle) elt.attr('data-onstyle', s.dataonstyle);
                                if (!!s.dataoffstyle) elt.attr('data-offstyle', s.dataoffstyle);
                                if (!!s.dataon) elt.attr('data-on', s.dataon);
                                if (!!s.dataoff) elt.attr('data-off', s.dataoff);


                                $.each(s.subs, function(key, sub) {
                                    let subid = sub.id;
                                    let subcls = sub.cls;

                                    if (!subid) {
                                        subid = '';
                                    }

                                    if (subcls != '' && !!subcls) {
                                        subcls = ' ' + subcls;
                                    } else {
                                        subcls = '';
                                    }

                                    let subelt = addElt('#' + sid, subid, subcls, sub.type);

                                    if (!!sub.txt) subelt.text(sub.txt);
                                    if (!!sub.html) subelt.html(sub.html);
                                    if (!!sub.itype) subelt.attr('type', sub.itype);
                                    if (!!sub.checked) subelt.attr('checked', sub.checked);
                                    if (!!sub.for) subelt.attr('for', sub.for);
                                    if (!!sub.close) subelt.attr('close', sub.close);
                                    if (!!sub.switch) subelt.attr('switch', sub.switch);
                                    if (!!sub.control) subelt.attr('control', sub.control);
                                    if (!!sub.datatoggle) subelt.attr('data-toggle', sub.datatoggle);
                                    if (!!sub.datawidth) subelt.attr('data-width', sub.datawidth);
                                    if (!!sub.datasize) subelt.attr('data-size', sub.datasize);
                                    if (!!sub.dataheight) subelt.attr('data-height', sub.dataheight);
                                    if (!!sub.datastyle) subelt.attr('data-style', sub.datastyle);
                                    if (!!sub.dataonstyle) subelt.attr('data-onstyle', sub.dataonstyle);
                                    if (!!sub.dataoffstyle) subelt.attr('data-offstyle', sub.dataoffstyle);
                                    if (!!sub.dataon) subelt.attr('data-on', sub.dataon);
                                    if (!!sub.dataoff) subelt.attr('data-off', sub.dataoff);

                                });
                                //console.log('s:' + sid);
                            });
                            //console.log('p:' + pid);
                        });
                        //console.log('col:' + colid);
                    });
                    //console.log('section:' + sectionid);
                    // end проход по секциям
                });

                // обработка формул
                let formulas = $('[formula]');
                // привязать обработчики событий
                $.each(formulas, function(key, val) {
                    let formula = val.attributes['formula'].value;
                    let formulaid = val.attributes['for'].value;
                    let ops = val.attributes['ops'].value.toString();
                    let arr = ops.split(',');

                    formula = prepareformula(formulaid, formula, arr);

                    let result = evaluate(formula);
                    $(formulaid).val(normalizeResult(result));

                    $.each(arr, function(key, id) {
                        $('#' + id).on('change', function(event) {
                            $.each(formulas, function(key, val) {

                                let formula = val.attributes['formula'].value;
                                let formulaid = val.attributes['for'].value;
                                let ops = val.attributes['ops'].value.toString();
                                let arr = ops.split(',');

                                formula = prepareformula(formulaid, formula, arr);
                                let result = evaluate(formula);
                                $(formulaid).val(normalizeResult(result));
                            });
                        });
                    });
                });

                function normalizeResult(value) {
                    let result = 0;
                    if (value.toString() == '') {
                        result = value;
                    } else if (value.toString() == 'NaN') {
                        result = '';
                    } else if (value.toString() == 'Infinity' || value.toString() == '-Infinity') {
                        result = 'бесконечность';
                    } else if (Number.isInteger(value)) {
                        result = value;
                    } else {
                        result = value.toFixed(2);
                    };
                    return result.toString().replace('.', ',');
                }

                function normalizeValue(value) {
                    let result = value.replaceAll(' ', '').replace(',', '.');
                    return Number(result);
                }
                /*
                math.format(6.4)                                        // returns '6.4'
                math.format(1240000)                                    // returns '1.24e6'
                math.format(1/3)                                        // returns '0.3333333333333333'
                math.format(1/3, 3)                                     // returns '0.333'
                math.format(21385, 2)                                   // returns '21000'
                math.format(12e8, {notation: 'fixed'})                  // returns '1200000000'
                math.format(2.3,  {notation: 'fixed', precision: 4})    // returns '2.3000'
                math.format(52.8, {notation: 'exponential'})            // returns '5.28e+1'
                math.format(12400,{notation: 'engineering'})            // returns '12.400e+3'
                math.format(2000, {lowerExp: -2, upperExp: 2})          // returns '2e+3'

                function formatCurrency(value) {
                  // return currency notation with two digits:
                  return '$' + value.toFixed(2)

                  // you could also use math.format inside the callback:
                  // return '$' + math.format(value, {notation: 'fixed', precision: 2})
                }
                math.format([2.1, 3, 0.016], formatCurrency}            // returns '[$2.10, $3.00, $0.02]'
                */

                function prepareformula(formulaid, formula, arr) {

                    $.each(arr, function(key, id) {
                        let val = normalizeValue($('#' + id).val());
                        formula = formula.replace('#' + id, val);
                    });
                    return formula;
                }

                function evaluate(formula) {
                    let result = '';
                    try {
                        result = math.evaluate(formula);
                    } catch (e) {
                        log(e);
                    }
                    return result;
                };


                // buttons
                $('.buttoncheck').on('click', function() {
                    let name = $(this).attr('for');
                    let checks = $('input[name="' + name + '"]');
                    let mistakes = [];


                    $.each(checks, function(key, check) {
                        if ($(this).attr('answer').toString() != check.checked.toString()) {
                            mistakes.push(check);
                            if (check.checked == true) $(this).parent().addClass('bg-danger-opacity-20');
                        } else {

                            if (check.checked == true) $(this).parent().addClass('bg-success-opacity-20');
                        }
                    });

                    if (mistakes.length > 0) {
                        $.each(checks, function(key, check) {
                            if (!check.checked) $(this).parent().addClass('bg-danger-opacity-20');
                        });
                    }

                    $.each(mistakes, function(key, mistake) {
                        // подумать над статистикой ошибок
                    });
                    // выключаем чекбоксы и радиокнопки после проверкм
                    $.each(checks, function(key, check) {
                            $(this).attr('disabled', 'disabled');
                        })
                        // включаем кнопку далее
                    $('#buttonnext').removeAttr('disabled');
                    $(this).attr('disabled', 'disabled');

                });

                $('.buttonnext').on('click', function() {


                });

                $('.custom-control-input').on('click', function() {
                    let name = $(this).attr('name');
                    let type = $(this).attr('type');
                    let checked = false;
                    let button = $('button[for="' + name + '"]');

                    let checks = $('input[name="' + name + '"]');
                    $.each(checks, function(key, check) {
                        if (check.checked == true) {
                            checked = true;
                        }
                    })
                    if (checked == true && type == 'checkbox' || type == 'radio') {
                        button.removeAttr('disabled');
                    } else {
                        button.attr('disabled', 'disabled');
                    }
                });
                $('.custom-control-label').on('click', function() {
                    let name = $(this).attr('name');
                    let id = $(this).attr('for');
                    let type = $('#' + id).attr('type');
                    let checked = false;
                    let button = $('button[for="' + name + '"]');

                    let checks = $('input[name="' + name + '"]');
                    $.each(checks, function(key, check) {
                        if (check.checked == true) {
                            checked = true;
                        }
                    })
                    if (checked == true && type == 'checkbox' || type == 'radio') {
                        button.removeAttr('disabled');
                    } else {
                        button.attr('disabled', 'disabled');
                    }

                });

                // вкл/выкл абзацев
                $('select.selectpicker').on('change', function() {
                    let selected = $('.selectpicker option:selected').val();
                    $($(this).attr('change-control')).text(selected);
                });

                $('select.selectpicker').removeClass('d-inline');
                $('div.divhidden').removeClass('d-inline');

                $('input[switch]').on('click', function() {
                    if ($(this).attr('switch') == 'true') {
                        $(this).attr('switch', 'false');
                        //$(this).parent().attr('close','true');
                        $(this).attr('checked', 'false');
                        $($(this).attr('control')).removeClass('d-inline').addClass('d-none');
                    } else {
                        $(this).attr('switch', 'true');
                        //$(this).parent().attr('close','false');
                        $(this).attr('checked', 'true');
                        $($(this).attr('control')).removeClass('d-none').addClass('d-inline');
                    }
                });

                // привычный для русского взляда вид
                Inputmask.extendAliases({
                    'decimalWithSpaces': {
                        prefix: '',
                        groupSeparator: ' ',
                        radixPoint: ',',
                        alias: 'numeric',
                        placeholder: '',
                        digits: 2,
                        allowPlus: false,
                        allowMinus: true
                    }
                });

                $(":input").inputmask();
                // end frm.ver "0.0.1 b""
            } else {
                console.log("неопознанная версия формы")
            }
        })
        .fail(function(data) {
            log('form.json fail');
        })
        .always(function(data) {
            log('form.json always');
        });


}
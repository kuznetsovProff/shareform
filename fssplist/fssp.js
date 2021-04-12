            let data_schemes = [];
            /*
                regions.csv
                ----------
                0 - "Код региона" - regioncode
                1 - "Сокращенное наименование" - name
                2 - "Наименование региона" - region
            */
            let regions_data_scheme = {
                "filename": "regions.csv",
                "cols": [{
                    "id": "0",
                    "title": "Код региона",
                    "property": "regioncode"
                }, {
                    "id": "1",
                    "title": "Сокращенное наименование",
                    "property": "name"
                }, {
                    "id": "2",
                    "title": "Наименование региона",
                    "property": "region"
                }]
            };

            data_schemes.push(regions_data_scheme);
            /*
                ufssp.csv
                ---------
                +0 - "Полное наименование" - fullname
                +1 - "Сокращенное наименование" - name
                +2 - "ФИО Руководителя" - boss
                +3 - "Должность" - post
                +4 - "Описание задач и функций" - description
                +5 - "Почтовый адрес" - postaddress
                +6 - "Часы работы" - workinghours
                +7 - "ОКТМО" - oktmo
                +8 - "ОКАТО" - okato
                +9 - "ОКПО" - okpo
                +10 - "ОГРН" - ogrn
                +11 - "ИНН" - tin
                +12 - "Телефоны для справок" - phoneinfo
                +13 - "Другие телефоны" - phoneother
                14 - "Факс" - fax
                15 - "Ссылка" - url
                16 - "Электронная почта" - email
            */
            let ufssp_data_scheme = {
                "filename": "ufssp.csv",
                "cols": [{
                    "id": "0",
                    "title": "Полное наименование",
                    "property": "fullname"
                }, {
                    "id": "1",
                    "title": "Сокращенное наименование",
                    "property": "name"
                }, {
                    "id": "2",
                    "title": "ФИО руководителя",
                    "property": "boss"
                }, {
                    "id": "3",
                    "title": "Должность",
                    "property": "post"
                }, {
                    "id": "4",
                    "title": "Описание задач и функций",
                    "property": "description"
                }, {
                    "id": "5",
                    "title": "Почтовый адрес",
                    "property": "postaddress"
                }, {
                    "id": "6",
                    "title": "Часы работы",
                    "property": "workinghours"
                }, {
                    "id": "7",
                    "title": "ОКТМО",
                    "property": "oktmo"
                }, {
                    "id": "8",
                    "title": "ОКАТО",
                    "property": "okato"
                }, {
                    "id": "9",
                    "title": "ОКПО",
                    "property": "okpo"
                }, {
                    "id": "10",
                    "title": "ОГРН",
                    "property": "ogrn"
                }, {
                    "id": "11",
                    "title": "ИНН",
                    "property": "tin"
                }, {
                    "id": "12",
                    "title": "Телефоны для справок",
                    "property": "phoneinfo"
                }, {
                    "id": "13",
                    "title": "Другие телефоны",
                    "property": "phoneother"
                }, {
                    "id": "14",
                    "title": "Факс",
                    "property": "fax"
                }, {
                    "id": "15",
                    "title": "Ссылка",
                    "property": "url"
                }, {
                    "id": "16",
                    "title": "Электронная почта",
                    "property": "email"
                }]
            };
            data_schemes.push(ufssp_data_scheme);
            /*
                osp.csv
                -------
                0 - "Код региона" - regioncode
                1 - "Код" - code
                2 - "Наименование" - name
                3 - "Почтовый адрес" - postaddress
                4 - "ФИО начальника" - boss
                5 - "Телефоны" - phone
                6 - "Факс" - fax
                7 - "Телефон для справок" - phoneinfo1
                8 - "Телефон для справок 2" - phoneinfo2
                9 - "Рабочие часы" - workinghours
                10 - "Территория обслуживания" - territory
            */
            let osp_data_scheme = {
                "filename": "osp.csv",
                "cols": [{
                    "id": "0",
                    "title": "Код региона",
                    "property": "regioncode"
                }, {
                    "id": "1",
                    "title": "Код",
                    "property": "code"
                }, {
                    "id": "2",
                    "title": "Наименование",
                    "property": "name"
                }, {
                    "id": "3",
                    "title": "Почтовый адрес",
                    "property": "postaddress"
                }, {
                    "id": "4",
                    "title": "ФИО начальника",
                    "property": "boss"
                }, {
                    "id": "5",
                    "title": "Телефоны",
                    "property": "phone"
                }, {
                    "id": "6",
                    "title": "Факс",
                    "property": "fax"
                }, {
                    "id": "7",
                    "title": "Телефон для справок",
                    "property": "phoneinfo1"
                }, {
                    "id": "8",
                    "title": "Телефон для справок 2",
                    "property": "phoneinfo2"
                }, {
                    "id": "9",
                    "title": "Рабочие часы",
                    "property": "workinghours"
                }, {
                    "id": "10",
                    "title": "Территория обслуживания",
                    "property": "territory"
                }]
            };

            let ospmistakes = [{
                "regioncode": "25",
                "original": "Отдел судебных приставов по Тернейскому району",
                "correct": "Отделение судебных приставов по Тернейскому району"
            }, {
                "regioncode": "57",
                "original": "Болховский РОСП",
                "correct": "Болховское РОСП"
            }, {
                "regioncode": "66",
                "original": "Гаринское ОСП",
                "correct": "Гаринское РОСП"
            }, {
                "regioncode": "70",
                "original": "ОСП по г. Северску УФССП России по Томской области",
                "correct": "ОСП по г. Северску"
            }, {
                "regioncode": "36",
                "original": "Отделение судебных приставов по взысканию административных штрафов",
                "correct": "ОСП по ВАШ"
            }, {
                "regioncode": "35",
                "original": "ООД",
                "correct": "Отделение оперативного дежурства"
            }, {
                "regioncode": "63",
                "original": "",
                "correct": "Отдельные должности (по мобилизационной подготовке и гражданской обороне)"
            }, {
                "regioncode": "69",
                "original": "Отделение информатизации и обеспечения информационной безопасности",
                "correct": "Отдел информатизации и обеспечения информационной безопасности"
            }, {
                "regioncode": "78",
                "original": "Отдел противодействия коррупции",
                "correct": "Отдел собственной безопасности"
            }];

            data_schemes.push(osp_data_scheme);
            /*
                phones.csv
                ----------
                0 - "Код региона" - regioncode
                1 - "Наименование подразделения" - agencyname
                2 - "Должность" - post
                3 - "ФИО" - name
                4 - "Тип" - type
                5 - "Телефон" - phone

            */
            let phones_data_scheme = {
                "filename": "phones.csv",
                "cols": [{
                    "id": "0",
                    "title": "Код региона",
                    "property": "regioncode"
                }, {
                    "id": "1",
                    "title": "Наименование подразделения",
                    "property": "agencyname"
                }, {
                    "id": "2",
                    "title": "Должность",
                    "property": "post"
                }, {
                    "id": "3",
                    "title": "ФИО",
                    "property": "name"
                }, {
                    "id": "4",
                    "title": "Тип",
                    "property": "type"
                }, {
                    "id": "5",
                    "title": "Телефон",
                    "property": "phone"
                }]
            };
            data_schemes.push(phones_data_scheme);
  
  
            /*
                                            //управления
                                            let fssptitles = [
                                                "Полное наименование",
                                                "Сокращенное наименование",
                                                "ФИО Руководителя",
                                                "Должность",
                                                "Описание задача и функций",
                                                "Почтовый адрес",
                                                "Часы работы",
                                                "ОКТМО",
                                                "ОКАТО",
                                                "ОКПО",
                                                "ОГРН",
                                                "ИНН",
                                                "Телефоны для справок",
                                                "Другие телефоны",
                                                "Факс",
                                                "Ссылка",
                                                "Электронная почта"
                                            ];



                                            //let getRegionsPromise = promisify(getRegions);
                                            //в функции с промисом надо проследить всю цепочку
                                            //загрузку fssp начинать после загрузки регионов
                                            //загрузку osp начинать после загрузки fssp
                                            //загрузку телефонов начинать после загрузки osp
                                            function getRegionsPromise(prop) {
                                                //объект "обещание"
                                                return new Promise(function(resolve, reject) {
                                                    try {
                                                        // главная логика
                                                        let data = prop.data;
                                                        let arr = [];
                                                        data.forEach((item, i) => {
                                                            if (i != 0 && item[0] != "") {
                                                                arr.push(item);
                                                            }
                                                        });
                                                        return resolve(arr); // в случае успеха
                                                        //
                                                    } catch (err) {
                                                        return reject(err); // в случае ошибки
                                                    }
                                                });
                                            }

                                            function RegionsPrepare(data) {
                                                getRegionsPromise(data)
                                                    .then((results) => {

                                                        regions = results; //передаем результ загрузки в глобальную переменную

                                                        return regions;
                                                    })
                                                    .then((results) => {
                                                        console.log(results);
                                                        RegionsLoaded();
                                                    })
                                                    .catch((err) => console.log("regions list loaded error: " + err));
                                            }

                                            function RegionsLoaded() {

                                                anime({
                                                    targets: '.lamp_regions',
                                                    backgroundColor: '#008000'
                                                });
                                                console.log("regions list loaded! ");
                                                displayRegionsListPromise(regions);
                                            };

                                            function displayRegionsListPromise(regions) {
                                                //объект "обещание"
                                                return new Promise(function(resolve, reject) {

                                                    try {
                                                        //let titles = regions.shift();

                                                        function compareNumericByCode(a, b, i = 0) {
                                                            if (Number(a[i]) > Number(b[i])) return 1;
                                                            if (Number(a[i]) == Number(b[i])) return 0;
                                                            if (Number(a[i]) < Number(b[i])) return -1;
                                                        }

                                                        regions = regions.sort(compareNumericByCode);

                                                        regions = makeRegionsAsObjects(regions);

                                                        let container = d3.select("#regions");
                                                        //отфильтровать массив

                                                        let dataregions = container.selectAll("div .row").data(regions);
                                                        dataregions.attr("id", (d) => "region_" + d.code);
                                                        let dataenter = dataregions.enter()
                                                        let row = dataenter.append("div")
                                                            .attr("class", "row p-1")
                                                            .attr("id", (d) => "region_" + d.code);
                                                        d3.select("#btn_region_select").on("click", () => {
                                                            d3.select("#btn_set_region").text(region_name);
                                                            $("#modalregions").modal("hide");
                                                        });

                                                        row.on("click", (m, o) => {
                                                            d3.selectAll(".selected-row").classed("selected-row", false);
                                                            d3.select("#region_" + o.code).classed("selected-row", true);
                                                            d3.select("#btn_region_select").property("disabled", false);

                                                            current_region = o.code;
                                                            region_name = o.name;

                                                            console.log(m); //mouse
                                                            console.log(o); //object
                                                        });

                                                        row.append("div").attr("class", "col").text(d => d.name);
                                                        dataregions.exit().remove();

                                                        return resolve(regions);
                                                    } catch (err) {

                                                        return reject(err);
                                                    }

                                                });
                                            }

                                            function makeRegionsAsObjects(arr) {
                                                // преобразуем вложенные массивы в объекты
                                                // для большей гибкости при выводе информации
                                                let result = [];
                                                arr.forEach((item, i) => {
                                                    let obj = {};
                                                    obj.code = item[0]; //код
                                                    obj.name = item[1]; //наименование подразделения
                                                    obj.region = item[2]; //регион
                                                    //сюда можно добавить функции
                                                    result.push(obj);
                                                });
                                                return result;
                                            }
        
                                    loadCsv("ufssp.csv", UfsspPrepare);

                                    let getUfsspPromise = promisify(getUfssp);

                                    function UfsspPrepare(data) {
                                        getUfsspPromise(data)
                                            .then(UfsspLoaded())
                                            .catch((err) => console.log("ufssp list loaded error: " + err));
                                    }

                                    function UfsspLoaded() {

                                        anime({
                                            targets: '.lamp_ufssp',
                                            backgroundColor: '#008000'
                                        });
                                        console.log("ufssp list loaded!")

                                    };

                                    function getUfssp(results) {
                                        let data = results.data;

                                        data.forEach((item, i) => {
                                            if (i != 0 && item[0] != "") {
                                                //https://r87.fssp.gov.ru
                                                let code = item[15];
                                                code = Number(code.slice(9, 11)).toString();

                                                item.push(code);
                                                ufssp.push(item);

                                            }
                                        });
                                    }

                                    function makeUfsspAsObjects(arr) {
                                        let result = [];

                                        arr.forEach((item, i) => {
                                            let obj = {};
                                            //obj.code = item[0]; //код
                                            //obj.name = item[1]; //наименование подразделения
                                            //obj.region = item[2]; //регион
                                            //сюда можно добавить функции
                                            result.push(obj);
                                        });

                                        return result;
                                    }

                                    function makeOspArrAsObjects(arr) {
                                        // преобразуем вложенные массивы в объекты

                                        let result = [];
                                        arr.forEach((item, i) => {
                                            let obj = {};

                                            obj.region = item[0]; //регион
                                            obj.code = item[1].toString().padStart(3, "0") + item[11].padStart(2, "0"); //код
                                            obj.name = item[2]; //наименование
                                            obj.address = item[3]; //почтовый адрес
                                            obj.boss = item[4]; //ФИО начальника
                                            obj.phone = item[5]; //телефон
                                            obj.fax = item[6]; //факс
                                            obj.phoneinfo1 = item[7]; //справочный телефон 1
                                            obj.phoneinfo2 = item[8]; //справочный телефон 2
                                            obj.worktime = item[9]; //рабочее время
                                            obj.territory = item[10]; //территория
                                            obj.regioncode = item[11].padStart(2, "0"); //код региона

                                            //сюда можно добавить функции
                                            result.push(obj);
                                        });
                                        return result;
                                    }

                                    function makeOspEntryAsObjects(item) {
                                        // преобразуем вложенные массивы в объекты

                                        let obj = {};

                                        obj.region = item[0]; //регион
                                        obj.code = item[1]; //код
                                        obj.name = item[2]; //наименование
                                        obj.address = item[3]; //почтовый адрес
                                        obj.boss = item[4]; //ФИО начальника
                                        obj.phone = item[5]; //телефон
                                        obj.fax = item[6]; //факс
                                        obj.phoneinfo1 = item[7]; //справочный телефон 1
                                        obj.phoneinfo2 = item[8]; //справочный телефон 2
                                        obj.worktime = item[9]; //рабочее время
                                        obj.territory = item[10]; //территория
                                        obj.regioncode = item[11].padStart(2, "0"); //код региона

                                        return obj;
                                    }

                                    //отделы
                                    let osptitles = [
                                        "регион",
                                        "код",
                                        "наименование подразделения",
                                        "почтовый адрес",
                                        "ФИО начальника",
                                        "телефоны",
                                        "факс",
                                        //"телефон для справок",
                                        //"телефон для справок 2",
                                        "время работы",
                                        "территория обслуживания",
                                        "код региона"
                                    ];

                                    loadCsv("osp.csv", OspPrepare);
                                    */
            /*
                    function displayOSPTitlesPromise(titles) {
                        //объект "обещание"
                        return new Promise(function(resolve, reject) {
                            try {
                                let container = d3.select("#osp_titles");
                                let row = container.append("div")
                                    .attr("class", "row m-1");
                                let datatitles = row.selectAll("div .col").data(titles);
                                let dataenter = datatitles.enter();
                                let col = dataenter.append("div")
                                    .attr("class", function(d, i) {
                                        return "col p-1 " + "osp-col-" + (i + 1)
                                    }).text(d => d);
                                datatitles.exit().remove();

                                return resolve(titles);
                            } catch (err) {
                                return reject(err);
                            }
                        });
                    }*/

            //let displayOSPEntriesPromise = promisify(displayOSPEntries);
            /*
                    let getOspPromise = promisify(getOsp);

                    function OspPrepare(data) {

                        getOspPromise(data)
                            .then(OspLoaded())
                            .catch((err) => console.log("osp list loaded error: " + err));
                        //.then(displayOSPTitlesPromise(osptitles))
                        //.then(displayOSPEntriesPromise(data));

                    }

                    function OspLoaded() {

                        anime({
                            targets: '.lamp_osp',
                            backgroundColor: '#008000'
                        });
                        console.log("osp list loaded!")

                    };

                    function getOsp(results) {
                        let data = results.data;

                        data.forEach((item, i) => {
                            if (i != 0 && item[0] != "") {
                                try {
                                    let r = _.find(regions, function(i) {

                                        return i[0] === item[0];
                                    });
                                    item.push(r[0]);
                                    item[1] = item[11] + item[1].toString().padStart(3, "0");
                                    item[0] = r[2];

                                } catch (err) {

                                }
                                //console.log(f[1]);
                                osp.push(item);
                            }
                        });
                    }

                    loadCsv("phones.csv", PhonesPrepare);

                    let getPhonesPromise = promisify(getPhones);

                    function PhonesPrepare(data) {
                        getPhonesPromise(data)
                            .then(PhonesLoaded())
                            .catch((err) => console.log("phones list loaded error: " + err));
                    }

                    function PhonesLoaded() {
                        anime({
                            targets: '.lamp_phones',
                            backgroundColor: '#008000'
                        });
                        console.log("phones list loaded!")
                    };

                    function getPhones(results) {
                        let data = results.data;

                        data.forEach((item, i) => {
                            if (i != 0 && item[0] != "") {
                                phones.push(item);
                            }
                        });
                    }*/
            /*
                    // добавление строки со значениями из массива в таблицу
                    //
                    // @param {arr - массив, parent - ссылка d3}
                    // @returns {Promise}
                    //
                    function addRow(arr, parent, delay = 1000) {
                        //объект "обещание"
                        return new Promise(function(resolve, reject) {
                            setTimeout(() => {
                                try {
                                    //arr.pop(); //убрать код региона

                                    let obj = makeOspEntryAsObjects(arr);
                                    let phone = obj.phone;
                                    let phoneinfo1 = obj.phoneinfo1;
                                    let phoneinfo2 = obj.phoneinfo2;
                                    let phones = phone;

                                    if (phoneinfo1 != phone) phones = phones + "; " + phoneinfo1;
                                    if (phoneinfo2 != phoneinfo1 && phoneinfo1 != phone) phones = phones + "; " + phoneinfo2;

                                    let newarr = [obj.region, obj.code, obj.name, obj.address, obj.boss, phones, obj.fax, obj.worktime, obj.territory, obj.regioncode];



                                    let row = parent.append("div").attr("class", "row m-1");
                                    let datarow = row.selectAll("div .col").data(newarr);

                                    datarow.text((d) => d);
                                    datarow.enter().append("div")
                                        .attr("class", function(d, i) {
                                            return "col p-1 " + "osp-col-" + (i + 1);
                                        }).text(d => d);
                                    datarow.exit().remove();


                                    // в случае удачи возвращает массив, ссылку d3 на родителя и ссылку d3 на строку
                                    return resolve({
                                        array: arr,
                                        parent: parent,
                                        row: row
                                    });
                                } catch (err) {
                                    // в случае ошибки возвращает массив ссылку d3 на родителя и ошибку
                                    return reject({
                                        array: arr,
                                        parent: parent,
                                        error: err
                                    });
                                }
                            }, delay);
                        });
                    }

                    // последовательная рекурсивная подгрузка и показ изображений
                    // 
                    // @param arr - массив строк
                    // @param parent - d3 ссылка на родителя
                    //
                    function addEntries(arr, parent, delay = 100) {
                        let entry = arr.shift(); // проходим по массиву с изображениями

                        if (!entry) {
                            console.log("entries ok!");
                            return;
                        }; //если в результате рекурсии прошлись по всему массиву

                        //если в массиве еще есть изображение, загружаем его
                        return addRow(entry, parent, delay)
                            .then(function(result) {
                                console.log("entry ok!");
                                return addEntries(arr, parent, delay); //рекурсия
                            })
                            .catch(function(result) {
                                //если какая-то строка не добавлена переходим к следующему
                                console.log('ошибка: ', result.error);
                                return addEntries(arr, parent, delay); //рекурсия
                            });
                    }

                    //переписать под решетки
                    function displayOSPEntries(results) {

                        function compareNumericByRegionCode(a, b, i = 11) {
                            if (Number(a[i]) > Number(b[i])) return 1;
                            if (Number(a[i]) == Number(b[i])) return 0;
                            if (Number(a[i]) < Number(b[i])) return -1;
                        }

                        function compareNumericByCode(a, b, i = 1) {
                            if (Number(a[i]) > Number(b[i])) return 1;
                            if (Number(a[i]) == Number(b[i])) return 0;
                            if (Number(a[i]) < Number(b[i])) return -1;
                        }

                        osp = osp.sort(compareNumericByCode);
                        //osp = osp.sort(compareNumericByRegionCode);

                        let parent = d3.select("#osp");
                        //отфильтровать массив
                        addEntries(tableFilter(osp, 11, 77), parent, 0);

                    }

                    // фильтрация таблицы
                    function tableFilter(arr, col, val) {
                        // arr - массив из массивов
                        // col - столбец
                        // val - значение
                        // подумать над поиском части строки, если строковая переменная
                        let res = [];
                        arr.forEach((i) => {
                            if (i[col] == val) res.push(i);
                        });
                        return res;
                    };*/


            /**/

            //Исполнительные производства в отношении юридических лиц
            //https://opendata.fssp.gov.ru/7709576929-iplegallist
            //Оконченные
            //https://opendata.fssp.gov.ru/7709576929-iplegallistcomplete

            //Справочник видов документов (постановлений)
            //https://opendata.fssp.gov.ru/7709576929-doctypelist
            //Перечень международных договоров (конвенций, соглашений)
            //https://opendata.fssp.gov.ru/7709576929-treaties
            //План-график размещения заказов ФССП России
            //https://opendata.fssp.gov.ru/7709576929-purchases
            //Сведения об обращениях граждан
            //https://opendata.fssp.gov.ru/7709576929-appeals
            //Приказы по основной деятельности, изданные ФССП России
            //https://opendata.fssp.gov.ru/7709576929-regulations
            //Перечень информационных систем
            //https://opendata.fssp.gov.ru/7709576929-infosys
            //Сведения об имущественном положении и доходах руководства ФССП России
            //https://opendata.fssp.gov.ru/7709576929-dohodrukfssp
            //Сведения об имущественном положении и доходах руководителя организации, подведомственной ФССП России
            //https://opendata.fssp.gov.ru/7709576929-dohodruksanatorij
            //Ежегодный план проведения плановых проверок юридических лиц
            //https://opendata.fssp.gov.ru/7709576929-planproverokul
            //Информация об организованных конференциях, творческих конкурсах
            //https://opendata.fssp.gov.ru/7709576929-contests
            //График личного приема граждан
            //https://opendata.fssp.gov.ru/7709576929-grafiklpg
            //Государственный реестр юридических лиц
            //https://opendata.fssp.gov.ru/7709576929-gosreestrul
            //Справочник видов документов (запросов)
            //https://opendata.fssp.gov.ru/7709576929-doctypelistzapross


            //Перечень управлений
            //https://opendata.fssp.gov.ru/7709576929-tolist
            //Перечень отделов
            //https://opendata.fssp.gov.ru/7709576929-osp
            //https://opendata.fssp.gov.ru/7709576929-osp/data-20210226-structure-20160226.csv
            //Телефоны
            //https://opendata.fssp.gov.ru/7709576929-phonelist

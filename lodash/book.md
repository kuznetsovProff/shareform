# ++Lo++dash

## 1. Введение

Эта книга посвящена популярной библиотеке утилит JavaScript lodash.  Прежде чем обсуждать lodash, мы должны понять, зачем нам нужна библиотека утилит JavaScript.

С распространением Web 2.0, Ajax и NodeJS, JavaScript стал очень важным языком программирования как на стороне браузера, так и на стороне сервера.

Помимо недостатков первой стороны языка JavaScript, сам JavaScript не имеет богатого набора высокоуровневых API для разработчиков, что затрудняет выполнение стандартных задач программирования.

Например, очень распространенная задача - перебрать массив и последовательно обработать все элементы в этом массиве.

В некоторых старых браузерах объект JavaScript Array не имеет метода forEach ().  Для перебора массива требуется цикл for, как в листинге 1.1. а dosomething в следующем примере - это функция для обработки элементов в массиве.  

Листинг 1.1 Традиционный способ перебора массива

``` javascript

for (let i = 0, n = arr.length; i < n; i++) {
  dosomething(arr[i]);
}

```

При использовании метода forEach () код в листинге 1.1 можно упростить, как в листинге 1.2.

Листинг 1.2. Использование forEach () для перебора массива 

``` javascript
array.forEach(dosomething);
```

Сравнивая фрагменты кода в Листинге 1.1 и Листинге 1.2, очевидно, что Листинг 1.2 намного проще для понимания, и его легче писать и поддерживать, чем код в Листинге 1.1.

Вот почему разработчикам нужны более высокоуровневые API.

Сам JavaScript развивается, чтобы добавить больше языковых функций и API, но этот процесс идет недостаточно быстро.  

ECMAScript в 5 редакции, спецификация JavaScript, включает девять новых методовдля поиска и управления содержимым массива.  Это означает, что разработчики могут использовать метод forEach(), если движок JavaScript поддерживает ECMAScript 5.

Но некоторые старые браузеры, такие как IE 8, не поддерживают ECMAScript 5, а это означает, что разработчикам необходимо учитывать проблемы межплатформенной совместимости, если поддержка старых браузеров является  обязательным.

Спецификация ECMAScript 6 опубликована в июне 2015 года с множеством новых функций и улучшений.

См. полную таблицу совместимости ECMAScript 5 и 6 [здесь](http://kangax.github.io/compat-table/es5/) и [здесь](http://kangax.github.io/compat-table/es6/).

Разработчики полагаются на библиотеки JavaScript, чтобы упростить повседневную разработку.  Цель библиотек - стать мостом между средой выполнения JavaScript и разработчиками. 

Разработчики могут пользоваться API высокого уровня, предоставляемыми этими библиотеками.  Библиотеки отвечают за обработку деталей реализации о том, как эффективно использовать низкоуровневые API JavaScript.

Возможно, вы слышали или даже использовали другую библиотеку утилит JavaScript - [Underscore](http://underscorejs.org/).  

Underscore предоставляет богатый набор общих API в пространстве имен _.  Lodash также использует пространство имен _ и представляет собой замену Underscore с дополнительными функциями и улучшениями производительности.

Если вы уже используете Underscore, вы можете просто заменить Underscore на lodash, все должно работать.

Примеры в этой книге соответствуюь последней версии lodash 4.17.15.

## 1.1 Установка
Lodash - это обычная библиотека JavaScript, поэтому ее очень легко установить и использовать.
### 1.1.1 Веб
В веб-приложении мы можем просто загрузить файл JavaScript актуальной версии lodash и включить его на HTML-страницу, а затем использовать _ в коде JavaScript.

Листинг 1.3. Установка lodash на HTML-страницу

``` javascript

<script src="lodash.js"></script>

```

Мы также можем использовать ссылки, предоставленные серверами CDN, для загрузки lodash.

Сервера CDN обычно имеют разные версии lodash на выбор. В листинге 1.4 показано, как использовать cdnjs для загрузки lodash. 

cdnjs также предоставляет уменьшенную версию JavaScript с файлом сопоставления исходников.

Листинг 1.4 Загрузка lodash из cdnjs 
``` javascript

<script src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.js">
</script>

```
#### Поддержки Bower в версии 4 нет
Поддержка Bower была удалена из версии 4 в пользу npm. Но мы все еще можем использовать Bower для загрузки lodash v4.

### 1.1.2 NodeJS
В NodeJS мы можем установить lodash, используя npm или yarn (см. Листинг 1.5 и Листинг 1.6).

Листинг 1.5 Установка lodash с помощью npm 

```
$ npm install --save lodash

$ npm install --save lodash@4.17.15
```

Листинг 1.6 Установка lodash с помощью yarn

```
$ yarn add lodash

$ yarn add lodash@4.17.15
```

Для импорта пакета lodash необходимо использовать require, см. Листинг 1.7.

Листинг 1.7 Использование lodash в NodeJS 

``` javascript
// Require the whole lodash package
var _=require('lodash');

// Require only forEach
var forEach=require('lodash/forEach');
```

It’s recommended to only install NodeJS modules of actually used modules. For example, if the code only uses _.forEach method, then install the lodash.foreach module only.

Листинг 1.8 Use lodash modules
```
$ npm install --save lodash.foreach
```
``` javascript
var forEach = require('lodash.foreach');
```

## 1.2 Lodash features
Lodash focuses on providing core features that are frequently used for JavaScript built-in objects, including:

 * Arrays
 * Objects
 * Functions
 * Strings

Some of those features may have been included in latest version of ECMAScript specification. Some platforms may have also implemented extra features. If the underlying platform already supports a certain feature, lodash just uses the native implementation to improve performance.

## 1.3 Code sample convention
All code samples in this book are written in ECMAScript 6 JavaScript

syntax and tested on NodeJS 6.9.4. Most of the code are written as Jest test cases to verify the result. For those code that are not written as Jest code, the result of execution is provided below the actual code as a comment; see Listing 1.9.

Листинг 1.9 Code sample convention 

``` javascript
_.min([1,2,3]);
// ->1
```
As in the Listing 1.9 above, _.min([1, 2, 3]); is the actual code, 1 after // -> is the execution result.
The complete source code of this book can be found on GitHub.

## 1.4 About this book
Lodash is a well-documented JavaScript library with comprehensive official documentation. This book is a simple and concise guide on how to use lodash in practice. It covers core features and most frequently used functions.

# 2. Common concepts
Before diving into details of lodash functions, we start from some common concepts in lodash.
## 2.1 Truthy and falsy
Truthy and falsy values are very important when using lodash predicates. false, 0, ""(empty string), null, undefined and NaN are falsy values in JavaScript. All other values are truthy values.
## 2.2 SameValueZero
SameValueZero is the algorithm of how to compare two values in lodash. It’s similar with JavaScript “strict equality comparison” (===), except the handling of NaN. It always make developers confused as NaN === NaN returns false. SameValueZero removes that confusion, so NaN is same to NaN in SameValueZero algorithm.
## 2.3 Predicates
Predicate functions only return truthy or falsy values. They are used frequently in lodash. For example, when filtering a collection, a predicate function is required to determine what kind of elements should be kept.
Predicate functions can be written as plain old JavaScript functions. Lodash also provides some helper functions to generate predicate functions for common use cases.
### 2.3.1 matches 
_.matches(source) takes a source object and creates a new function which performs a deep comparison between the given object and the source object. _.matches supports comparison of different types of data, including booleans, numbers, strings, Date objects, RegExp objects, Object objects and arrays. Listing 2.1 shows how _.matches works by comparing strings and objects.

Listing 2.1 Match by object comparison



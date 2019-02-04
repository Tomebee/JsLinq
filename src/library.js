import { getLibName } from "./utils";

export default (function() {
  const checkNullOrEmptyArray = function(array) {
    if(!array || array.length < 1) {
      throw 'array is empty';
    }
  }
  const throwIfNotFunction = function(param, errorMessage) {
    if(!param || {}.toString.call(param) !== '[object Function]') {
      throw errorMessage || 'parameter is not a function';
    }
  }

  Array.prototype.select = function(mapFunction) {
    throwIfNotFunction(mapFunction);
    let array = this;
    checkNullOrEmptyArray(array);
    let elements;
    for(let element of array) {
      if(!elements) {
        elements = [];
      }
      elements.push(mapFunction(element));
    }

    return elements;
  };

  Array.prototype.where = function(predicate) {
    throwIfNotFunction(predicate,'predicate is not a function')

    let array = this;
    checkNullOrEmptyArray(array);
    let elements;
    for(let element of array) {
      if(!elements) {
        elements = [];
      }
      let predicateResult = predicate(element);
      if(typeof predicateResult != 'boolean') {
        throw 'predicate result must be boolean type';
      }
      if(predicateResult) {
        elements.push(element);
      }
    }
    return elements;
  };

  Array.prototype.firstOrDefault = function(predicate) {
    throwIfNotFunction(predicate,'predicate is not a function');
    let array = this;
    checkNullOrEmptyArray(array);
    let result;
    for(let element of array) {
      if(result)
        break;

      let predicateResult = predicate(element);

      if(typeof predicateResult != 'boolean') {
        throw 'predicate result must be boolean type';
      }

      if(predicateResult) {
        result = element;
      }
    }
    return result;
  };

  Array.prototype.first = function(predicate) {
    let array = this;
    checkNullOrEmptyArray(array);
    if(!predicate) {
      return array[0];
    }
    let element = array.firstOrDefault(predicate);
    if(!element) {
      throw 'Element not found by provided predicate';
    }
    return element;
  };

  Array.prototype.any = function(predicate) {
    let array = this;
    if(!array || array.length < 1) {
      return false;
    }
    if(!predicate) {
      return array.length > 0;
    }
    return array.firstOrDefault(predicate) ? true : false;
  }
})();
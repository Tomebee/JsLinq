# JsLinq
A small javascript library that provides c# linq funcionalities for js arrays

## Some examples
```
let array = [{name: 'abc'},{name: 'abc'},{name: 'abc2'}];

//it throws an exception 
let first = array.first(x => x.name == 'abc3');

//true
let any = array.any(x => x.name == 'abc2');

//[{newName: 'abc'},{newName: 'abc'}]
let mapped = array.where(x => x.name =='abc').select(x => ({newName: x.name}));
```
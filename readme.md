# tisnthings.js

Smallish set of things I often use.  Favors brevity.

Example: type checking with `tis(a,b)` (as in "type is"):
```javascript
tis(x,"")//is x a string?
tis(x,[])//is x an array?
tis(x,aFxn)//is x a function?
tis(x,/ /)//is x regex?
tis(x,new CustomThing)//is x a customThing?
```
Or a quick ways to `g`uess random numbers:
```javascript
g()//plain Math.random()
g(1)// 50 / 50 chance truthy
g(100)//randomly pick an integer between 0 & 100
g(50,60)//randomly pick an integer between 50 & 60
g(50,60,true)//pick a floaty decimal between 50 & 60
g([2,3,6,9])//randomly return a value from the array
```

`array2obj()`, or shorthand `a2o(array[,justBeTruthy[,specificValueKey]])`, allowing easy preprocessing of `[]`s into O(1)-accessible `{}` properties instead of using `[].indexOf`:
```javascript
a2o([1,2,3,4],"just be truthy")//{1: 1, 2: 1, 3: 1, 4: 1} //values all a truthy 1
a2o([1,2,3,4])                 //{1: 0, 2: 1, 3: 2, 4: 3} //values ascending
a2o([{k:1},{k:5},{z:12}],0,'k') //{1:{k:1},5:{k:5},undefined:{z:12}} //key by k, if value has it
```
and for symmetry's sake (albeit less used), `obj2array()`, or `o2a(object[,callKey])`:
```javascript
o2a({f:3,k:9,e:{Z:"Q"}})     //[{val:3,key:"f"},{val:9,key:"k"},{val:{Z:"Q"},key:"e"}]
o2a({f:3,k:9,e:{Z:"Q"}},"W") //[{val:3,W:"f"},{val:9,W:"k"},{val:{Z:"Q"},W:"e"}]
```
Some string functions:
```javascript
//what a human might like seeing:
"query_select ColumnName".pretty()//"Query Select Column Name"
//machine a string to something simpler:
"a Goofy nglés sentence!!(#&---".machine()//"a_goofy_ngl_s_sentence"

code2str(55356,57194,9786)//cookie + smiley face characters
"doc brown".toProperCase()//"Doc Brown"
"Something Else".decapitalize()//"something Else"
"convert into method name".toMethodName()//"convertIntoMethodName"
"somethingCamelCased".camelSplit()//["something", "Camel", "Cased"]
"pass".replaceAt(0,"b")//"bass"
x.in("a b c")//true if x=='a' || x=='b' || x=='c' (case insensitive)
```

Some constants & simple functions for easy reading:
```javascript
var aDay=24*3600*1000
  ,noop=function(){}
  ,aFxn=function(){}
  ,asc =function(a,b){return a<b?1:-1}
  ,desc=function(a,b){return a>b?1:-1}
  ,lexicalAsc=function(a,b){return a>b?1:a==b?0:-1}
```

Sometimes it's worth insisting you have an array:
```javascript
//x might not be an array
insistArray(x)//but it definitely is now
	.map(x=>x*x)
```

Give a function some inputs, but don't execute just yet:
```javascript
var gp=g.pass(1,10)
//...later
gp()//g(1,10)
```

And all `Math.*` functions are brought into the global scope.
```javascript
max(1,10)
sin(PI)
tan(PI/2)
///etc
```
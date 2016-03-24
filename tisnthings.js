//various helpers that should work anywhere
;(function(){
	var window=  typeof window!="undefined" && window
			||   typeof global!="undefined" && global
			||   typeof self  !="undefined" && self
	//shims
	Number.isNaN = Number.isNaN || function(value) { return typeof value === "number" && value !== value}
	Array.isArray = Array.isArray || function(arg) {return Object.prototype.toString.call(arg) === '[object Array]'}
	//string things
	var strs={
		 toProperCase:function(){
			//spaces
			var s=this.replace(/([a-z])([A-Z])/g,'$1_$2').replace(/_/g,' ')
			//can only proper case if I don't see TWO capitals next to each other; otherwise assume ACRONYM
			if(!s.match(/[A-Z]{2,}/)) return s.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			else return s
		}
		,decapitalize:function lowercaseOnlyFirstLetter() {
			return this[0].toLowerCase() + this.slice(1,this.length)
		}
		,toMethodName:function(){
			return this.pretty().split(" ").join("").decapitalize()
		}
		,camelSplit:function(andLowercase){
			var splitToken="~<x>~"
				,tokenized=this.replace(/([a-z])([A-Z])/g,'$1'+splitToken+'$2')
			if(andLowercase) tokenized=tokenized.toLowerCase()
			return tokenized.split(splitToken)
		}
		,pretty:function(){
			return this.replace(/([a-z])([A-Z])/g,'$1 $2')
				.replace(/([^_])_([^_])/g,'$1 $2')
				.toProperCase()
		}
		,machine:function(){
			var slug='_'
			return this.camelSplit("and lowercase").join(slug)
				.replace(/\W/g,slug)
				.replace(new RegExp("^"+slug+"+|"+slug+"+$","g"),'')//slug trim
		}
		,replaceAt:function(index,character){
			return this.substr(0,index)+character+this.substr(index+character.length)
		}
		,in:function(space_delimited_set){
			return !!this.match(new RegExp("\\b("+space_delimited_set.trim().split(/\s+/).join("|")+")\\b","i"))
		}
	}
	for(var k in strs) Object.defineProperty(String.prototype,k,{value:strs[k],enumerable:false})
	//a fxn thing 
	Object.defineProperty(Function.prototype,'pass',{value:function(){//pass a function with given variables for later execution; "return a function whose execution would be a guess between 1 and 10" would be guess.pass(1,10).
		//In the event arguments are already to be passed to the function, these will be appended to the arg sequence
		var _f=this,
			new_args=Array.prototype.slice.call(arguments, 0)
		return function(){
			var originally_sent_args=Array.prototype.slice.call(arguments, 0)
			return _f.apply(_f,originally_sent_args.concat(new_args))
		}
	},enumerable:false})
	var util={
		 tis          	:function(a,b){//"type is" as in tis(x,[])? or tis(x,{})? or tis(x,/ /)? or tis(x,new WeirdThing)?
			return a===undefined  ? b===undefined   
				: a===null        ? b===null        
				: Array.isArray(a)? Array.isArray(b)
				: Number.isNaN(a) ? Number.isNaN(b)
				: a!==undefined && b!==undefined && (a.constructor==b.constructor)
		}
		,g            	:function(min,max,floaty){//guess wrapper
			switch(arguments.length){
				case 1:
					var a=arguments[0]
					if(tis(a,[]))	return a[g(a.length-1)]							//pass an array, and I'll randomly pick an entry
					else 			return Math.round(0  +Math.random()*(    min))	//between 0 and given, assuming integer	
				case 2: 			return Math.round(min+Math.random()*(max-min))	//between min and max, assuming integer
				case 3: 			return            min+Math.random()*(max-min)	//between min and max, assuming float
				case 0: 			return                Math.random()				//regular
			}
		}
		,aDay           :24*3600*1000
		,noop         	:function(){}
		,aFxn           :function(){}		
		,asc            :function(a,b){return a<b?1:-1}
		,desc           :function(a,b){return a>b?1:-1}
		,lexicalAsc   	:function(a,b){return a>b?1:a==b?0:-1}
		,insistArray    :function(x){return tis(x,[]) ? x : [x]}
		,array2obj		:function(a,justBeTruthy,specificKey){
			var o={}
			a.forEach(function(v,i){
				if(specificKey) o[v[specificKey]]=v
				else o[v]=justBeTruthy ? 1 : i
			})
			return o
		}
		,a2o            :function(){return array2obj.apply({},arguments)}
		,obj2array      :function(o,specifyKeyName){
			return Object.keys(o).reduce(function(set,key){
				var nu={}
				nu.val=o[key]
				nu	[ specifyKeyName
					|| (o[key]['key']===undefined?'key':'_key') //guessing optimistically
					]=key
				set.push(nu)
				return set
			},[])
		}
		,o2a            :function(){return obj2array.apply({},arguments)}
		,code2str       :function(a){
			return Array.prototype.slice.call(arguments)
				.reduce(function(a,v){
					return a+String.fromCharCode(v)
				},'')
		}
	}
	//go away Maths
	Object.getOwnPropertyNames(Math).forEach(function(v){util[v]=Math[v]})	
	for(var i in util) window[i]=util[i]
})()
"object"!=typeof Smart&&(Smart={}),function(){var a={},b={},c=null,d=null;Smart.Plurals={getRule:function(e){var f,g,h,i,j;if(!e)return d||(d=this.getRule(c));if(e=e.toLowerCase(),e in b)return b[e];f=","+e+",";for(g in a)if(a.hasOwnProperty(g)&&(h=-1!==g.indexOf(f)))return i=a[g],b[i];return-1!==e.indexOf("-")?(j=e.split("-")[0],this.getRule(j)):null},setDefaultRule:function(a){c=a.toLowerCase(),d=null},defineRule:function(a,c){a=a.toLowerCase();var d=function(a,b){return"number"!=typeof b&&"number"==typeof b.length?b[c(a,b.length)]:c(a,b)};b[a]=d},defineLanguageCodes:function(b,d){b=","+b.toLowerCase()+",",d=d.toLowerCase(),a[b]=d,c||this.setDefaultRule(b.split(",")[1])}}}(),Smart.Plurals.defineLanguageCodes("en,de,nl,sv,da,no,nn,nb,fo,es,pt,it,bg,el,fi,et,he,eo,hu,tr","english"),Smart.Plurals.defineRule("english",function(a,b){var c,d,e=1===a;return 2===b?e?0:1:(c=0===a,3===b?c?0:e?1:2:(d=0>a,d?0:c?1:e?2:3))}),Smart.Plurals.defineLanguageCodes("cs,sk","czech"),Smart.Plurals.defineRule("czech",function(a,b){var c,d=1===a;return 2===b?d?0:1:(c=a>=2&&4>=a,d?0:c?1:2)}),Smart.Plurals.defineLanguageCodes("fr,pt-br","french"),Smart.Plurals.defineRule("french",function(a){var b=0===a||1===a;return b?0:1}),Smart.Plurals.defineLanguageCodes("ga","irish"),Smart.Plurals.defineRule("irish",function(a,b){var c,d=1===a;return 2===b?d?0:1:(c=2===a,d?0:c?1:2)}),Smart.Plurals.defineLanguageCodes("lv","latvian"),Smart.Plurals.defineRule("latvian",function(a,b){var c,d=a%10===1&&a%100!=11;return 2===b?d?0:1:(c=0===a,c?0:d?1:2)}),Smart.Plurals.defineLanguageCodes("lt","lithuanian"),Smart.Plurals.defineRule("lithuanian",function(a,b){var c,d=a%10===1&&a%100!=11;return 2===b?d?0:1:(c=a%100>=12&&19>=a%100,d?0:c?1:2)}),Smart.Plurals.defineLanguageCodes("pl","polish"),Smart.Plurals.defineRule("polish",function(a,b){var c,d=1===a;return 2===b?d?0:1:(c=a%10>=2&&4>=a%10&&(10>a%100||a%100>=20),d?0:c?1:2)}),Smart.Plurals.defineLanguageCodes("ro","romanian"),Smart.Plurals.defineRule("romanian",function(a,b){var c,d=1===a;return 2===b?d?0:1:(c=0===a||a%100>=1&&19>=a%100,d?0:c?1:2)}),Smart.Plurals.defineLanguageCodes("ru,uk,sr,hr","russian"),Smart.Plurals.defineRule("russian",function(a,b){var c,d=a%10===1&&a%100!=11;return 2===b?d?0:1:(c=a%10>=2&&4>=a%10&&(10>a%100||a%100>=20),d?0:c?1:2)}),Smart.Plurals.defineLanguageCodes("sl","slovenian"),Smart.Plurals.defineRule("slovenian",function(a,b){var c,d,e=a%100===1;return 2===b?e?0:1:(c=a%100===2,3===b?e?0:c?1:2:(d=a%100===3||a%100===4,e?0:c?1:d?2:3))});
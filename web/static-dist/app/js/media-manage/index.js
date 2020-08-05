!function(l){function t(t){for(var e,n,i=t[0],s=t[1],r=t[2],a=0,o=[];a<i.length;a++)n=i[a],Object.prototype.hasOwnProperty.call(u,n)&&u[n]&&o.push(u[n][0]),u[n]=0;for(e in s)Object.prototype.hasOwnProperty.call(s,e)&&(l[e]=s[e]);for(h&&h(t);o.length;)o.shift()();return d.push.apply(d,r||[]),c()}function c(){for(var t,e=0;e<d.length;e++){for(var n=d[e],i=!0,s=1;s<n.length;s++){var r=n[s];0!==u[r]&&(i=!1)}i&&(d.splice(e--,1),t=a(a.s=n[0]))}return t}var n={},u={205:0},d=[];function a(t){if(n[t])return n[t].exports;var e=n[t]={i:t,l:!1,exports:{}};return l[t].call(e.exports,e,e.exports,a),e.l=!0,e.exports}a.m=l,a.c=n,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/static-dist/";var e=window.webpackJsonp=window.webpackJsonp||[],i=e.push.bind(e);e.push=t,e=e.slice();for(var s=0;s<e.length;s++)t(e[s]);var h=i;d.push([743,0]),c()}({17:function(t,e){t.exports=jQuery},308:function(t,e){t.exports=function(t){var e=t.match(/^(\d{2}):(\d{2}):(\d{2}),(\d{3})$/);if(!e)throw new Error("Invalid SRT time format");var n=parseInt(e[1],10),i=parseInt(e[2],10),s=parseInt(e[3],10);return(n*=36e5)+(i*=6e4)+(s*=1e3)+parseInt(e[4],10)}},352:function(t,e){t.exports=function(t){if(!/^\d+$/.test(t.toString()))throw new Error("Time should be an Integer value in milliseconds");t=parseInt(t);var e=new Date(0,0,0,0,0,0,t),n=e.getHours()<10?"0"+e.getHours():e.getHours(),i=e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes(),s=e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds(),r=t-(36e5*n+6e4*i+1e3*s);return r<100&&10<=r?r="0"+r:r<10&&(r="00"+r),n+":"+i+":"+s+","+r}},381:function(t,e,n){"use strict";
/*!
 * Subtitle.js
 * Parse and manipulate SRT (SubRip)
 * https://github.com/gsantiago/subtitle.js
 *
 * @version 0.1.5
 * @author Guilherme Santiago
*/var i=n(308),s=n(352),r=n(631),a=n(632),o=n(633),l=n(634),c=n(636);function u(t){if(!(this instanceof u))return new u(t);this._subtitles=[],t&&this.parse(t)}var d=(t.exports=u).prototype;d.parse=function(t){this._subtitles=r(t)},d.add=function(t){return c(this._subtitles,t),this},d.getSubtitles=function(t){return l(this._subtitles,t)},d.stringify=function(){return a(this._subtitles)},d.resync=function(t){return this._subtitles=o(this._subtitles,t),this},u.toMS=i,u.toSrtTime=s},630:function(t,e){var n="<iframe src='"+$("#lesson-dashboard").data("media-player-url")+"' name='viewerIframe' id='viewerIframe' width='100%'allowfullscreen webkitallowfullscreen height='100%' style='border:0px'></iframe>";$("#lesson-video-content").html(n)},631:function(t,e,n){var l=n(308);t.exports=function(t){var n,i,s,r,a,o=[];if(!t)throw new Error("No SRT to parse");return t=t.trim(),(t=(t+="\n").replace(/\r\n/g,"\n").replace(/\n{3,}/g,"\n\n").split("\n")).forEach(function(t){if(t=t.toString(),n||!/^\d+$/.test(t)){if(!i){var e=t.match(/^(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})$/);if(e)return r=e[1],a=e[2],void(i=!0)}""===t.trim()?(o.push({index:n,start:r,end:a,duration:l(a)-l(r),text:s||""}),n=i=r=a=s=null):s?s+="\n"+t:s=t}else n=parseInt(t)}),o}},632:function(t,e){t.exports=function(t){var n="";return t.forEach(function(t,e){0<e&&(n+="\n"),n+=t.index,n+="\n",n+=t.start+" --\x3e "+t.end,n+="\n",n+=t.text,n+="\n"}),n}},633:function(t,e,n){var s=n(308),r=n(352);t.exports=function(t,i){if(!/(-|\+)?\d+/.test(i.toString()))throw new Error("Invalid time: "+i+".Expected a valid integer");return i=parseInt(i,10),t.map(function(t){var e=s(t.start),n=s(t.end);return e+=i,n+=i,t.start=r(e<0?0:e),t.end=r(n<0?0:n),t})}},634:function(t,e,n){var i=n(635),s=n(308),r={timeFormat:"srt",duration:!1};t.exports=function(t,e){return"ms"===(e=i(r,e)).timeFormat&&(t=t.map(function(t){return t.start=s(t.start),t.end=s(t.end),t})),e.duration||(t=t.map(function(t){return delete t.duration,t})),t}},635:function(t,e){t.exports=function(){for(var t={},e=0;e<arguments.length;e++){var n=arguments[e];for(var i in n)s.call(n,i)&&(t[i]=n[i])}return t};var s=Object.prototype.hasOwnProperty},636:function(t,e,n){var i=n(308),s=n(352);t.exports=function(t,e){if(!e.start||!e.end||!e.text)throw new Error("Invalid caption data");for(var n in e)if(e.hasOwnProperty(n)&&"text"!==n&&("start"===n||"end"===n)){if(/^(\d{2}):(\d{2}):(\d{2}),(\d{3})$/.test(e[n]))continue;if(!/^\d+$/.test(e[n]))throw new Error("Invalid caption time format");e[n]=s(e[n])}return t.push({index:t.length+1,start:e.start,end:e.end,duration:i(e.end)-i(e.start),text:e.text}),t}},743:function(t,e,n){"use strict";n.r(e);for(var i=n(12),r=n.n(i),s=n(61),a=n.n(s),o=n(0),l=n.n(o),c=n(1),u=n.n(c),d=(n(630),n(6)),h=n.n(d),p=new(n(89).a)({name:"parent",project:"PlayerProject",children:[document.getElementById("viewerIframe")],type:"parent"}),f=n(15),m=$(".js-editbox"),v=$("#editbox-lesson-list"),g=m.data("mediaLength"),b=g/6,w=0;w<=6;w++){var y=$('[data-role="scale-default"]').clone().css("left",x(b*w,g)).removeClass("hidden").removeAttr("data-role");y.find('[data-role="scale-time"]').text(f.i(Math.round(b*w))),$('[data-role="scale-default"]').before(y)}function x(t,e){return 20+t*$("#editbox-lesson-list").width()/h()(e)}p.on("timechange",function(t){$(".scale-white").css("left",x(t.currentTime,g))}),$(".scale-white").on("mousedown",function(t){$(document).on("mousemove.playertime",function(t){window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();var e=t.pageX>v.width()+20?v.width()+20:t.pageX&&t.pageX<=20?20:t.pageX;$(".scale-white").css("left",e);var n,i,s=(n=e,i=g,Math.round((n-20)*i/$("#editbox-lesson-list").width()));p.sendToChild({id:"viewerIframe"},"setCurrentTime",{time:s})}).on("mouseup.playertime",function(t){$(document).off("mousemove.playertime"),$(document).off("mousedown.playertime")})});var S={init:function(t){this.$el=$(t.id),this.options=[],this.optionsLimit=t.optionsLimit||!1,this.eventManager={},this.initParent(),this.initEvent()},initParent:function(){var t=$(document.createDocumentFragment());t.append(this.templete()),this.$el.append(t),this.$parentDom=$(".track-select-parent"),this.$list=$(".track-selcet-list"),this.$dataShow=this.$parentDom.find(".data-show"),this.$open=this.$parentDom.find(".track-selcet-open-arrow"),this.$close=this.$parentDom.find(".track-selcet-close-arrow"),this.$showBox=this.$parentDom.find(".track-select-show")},initEvent:function(){var n=this;this.$parentDom.delegate(".track-selcet-open-arrow","click",this.handleOpen.bind(this)).delegate(".track-selcet-close-arrow","click",this.handleClose.bind(this)).delegate(".delete","click",this.handleDelete.bind(this)).delegate(".select-item","click",function(){$(this).siblings().removeClass("active"),$(this).addClass("active");var t=$(this).find(".value").html(),e=$(this).find(".value").attr("url");n.setValue({name:t,url:e}),n.handleClose()}),this.$showBox.on("click",this.toggle.bind(this)),this.on("valuechange",function(){this.$dataShow.html(this.getValue().name),this.$dataShow.attr("title",this.getValue().name)}),this.on("listchange",function(){this.optionsLimit&&this.options.length>=this.optionsLimit&&this.trigger("optionlimit"),this.$list.html(this.getOptionsStr()),this.setValue(this.getDefaultOption())}),this.on("optionempty",this.handleOptionEmpty.bind(this))},templete:function(){return'<div class="track-select-parent">\n              <div class="track-select-show">\n                <div class="data-show" title="'.concat(this.getDefaultOption().name,'"></div>\n                <span class="track-selcet-open-arrow">\n                  <i class="es-icon es-icon-keyboardarrowdown"></i>\n                </span>\n                <span class="track-selcet-close-arrow" style="display:none;">\n                  <i class="es-icon es-icon-keyboardarrowup"></i>\n                </span>\n              </div>\n              <ul class="track-selcet-list" style="display:none;">\n                ').concat(this.getOptionsStr(),"\n              </ul>\n            </div>")},getDefaultOption:function(){return this.options.length?this.options[0]:(this.open&&this.handleClose(),!1)},getOptionsStr:function(){this.options.length||this.trigger("optionempty");var i="";return this.options.map(function(t,e){var n;i+='<li class="select-item">\n                        <div class="value" title="'.concat(t.name,'" url="').concat(t.url,'">\n                          ').concat(t.name,'\n                        </div>\n                        <span class="convertStatus convert-').concat(t.convertStatus,'">').concat((n=t.convertStatus,{waiting:Translator.trans("subtitle.status.waiting"),doing:Translator.trans("subtitle.status.doing"),success:Translator.trans("subtitle.status.success"),error:Translator.trans("subtitle.status.error"),none:Translator.trans("subtitle.status.waiting")}[n]),'</span>\n                        <i class="es-icon es-icon-close01 delete" data-index="').concat(e,'"></i>\n                      </li>')}),i},setValue:function(t){if(!t)return this.$dataShow.html(Translator.trans("subtitle.no_subtitle_hint")),void this.trigger("valuechange",!1);this.value=t,this.trigger("valuechange",this.value)},getValue:function(){return this.value||{name:Translator.trans("subtitle.no_subtitle_hint")}},toggle:function(){this.open?this.handleClose():this.handleOpen()},handleOpen:function(){this.options.length&&(this.open=!0,this.$open.hide(),this.$close.show(),this.$showBox.addClass("active"),this.$list.slideDown(200))},handleClose:function(){this.open=!1,this.$close.hide(),this.$open.show(),this.$showBox.removeClass("active"),this.$list.slideUp(200)},handleDelete:function(t){var e=t.target;$(e).parent().remove(),this.trigger("deleteoption",this.options[$(e).data("index")]),this.options.splice($(e).data("index"),1),this.trigger("listchange",this.options),t.stopPropagation()},handleOptionEmpty:function(){this.value="",this.trigger("valuechange",!1)},on:function(t,e){this.eventManager[t]?this.eventManager[t].push(e.bind(this)):this.eventManager[t]=[e.bind(this)]},trigger:function(t,e){this.eventManager[t]&&this.eventManager[t].map(function(t){t(e)})},resetOptions:function(t){this.options=t,this.trigger("listchange",this.options)},addOption:function(t){t.convertStatus||(t.convertStatus="waiting"),this.options.push(t),this.trigger("listchange")}},O=n(4),k=n(381),T=n.n(k),_=$(".text-track-overview"),I=$("#uploader");new(function(){function t(){l()(this,t),this.select=null,this.init()}return u()(t,[{key:"init",value:function(){this.initTextDisplay(),this.initSelect(),this.initUploader()}},{key:"initTextDisplay",value:function(){var t=$(".manage-edit-body").height(),e=$(".nav-tabs-edit").height(),n=$(".text-track-title").height(),i=$("#track-select").height();_.height(t-e-n-i-140).show()}},{key:"initSelect",value:function(){var t=a()(S),e=$("#track-select").data("subtitleList"),n=I.data("mediaId"),i=this;t.init({id:"#track-select",optionsLimit:4}),t.on("valuechange",function(t){t?$.ajax({url:t.url,type:"GET"}).done(i.showSubtitleContent):_.html(Translator.trans("subtitle.no_subtitle_hint"))}),t.on("deleteoption",function(t){var e="/media/".concat(n,"/subtitle/").concat(t.id,"/delete");$.post(e,function(t){t&&(Object(O.a)("success",Translator.trans("subtitle.delete_success_hint")),I.show())})}),t.on("optionlimit",function(){I.hide()}),t.resetOptions(e),this.select=t}},{key:"initUploader",value:function(){var e=this.select,t=I.data("mediaGlobalId"),n=I.data("mediaId"),i=I.data("subtitleCreateUrl"),s=new UploaderSDK({sdkBaseUri:app.cloudSdkBaseUri,disableDataUpload:app.cloudDisableLogReport,disableSentry:app.cloudDisableLogReport,initUrl:I.data("initUrl"),finishUrl:I.data("finishUrl"),id:"uploader",ui:"simple",multi:!0,accept:{extensions:["srt"],mimeTypes:["text/srt"]},type:"sub",process:{common:{videoNo:t}}});s.on("error",function(t){"Q_TYPE_DENIED"===t.error&&Object(O.a)("danger",Translator.trans("subtitle.upload_srt_hint"))}),s.on("file.finish",function(t){$.post(i,{name:t.name,subtitleId:t.no,mediaId:n}).success(function(t){t&&(e.addOption(t),Object(O.a)("success",Translator.trans("subtitle.upload_success_hint")),setTimeout(function(){var t="/media/".concat(n,"/subtitles");$.get(t).done(function(t){t.subtitles&&e.resetOptions(t.subtitles)})},5e3))}).error(function(t){Object(O.a)("danger",Translator.trans(t.responseJSON.error.message))})})}},{key:"showSubtitleContent",value:function(t){var e=new T.a;try{e.parse(t)}catch(t){return Object(O.a)("danger",Translator.trans("subtitle.parse_error_hint")),void _.html(Translator.trans("subtitle.parse_error_hint"))}var i=e.getSubtitles({duration:!0,timeFormat:"ms"}),n="";i.map(function(t){n+="<p>".concat(t.text,"</p>")}),_.html(n);var s=_.find("p");p.on("timechange",function(n){setTimeout(function(){var t=i.find(function(t,e){if(t.start/1e3>n.currentTime)return t});s.removeClass("active"),t&&1<t.index&&i[t.index-2].end>1e3*r()(n.currentTime)&&s.eq(t.index-2).addClass("active")},0)})}}]),t}())}});
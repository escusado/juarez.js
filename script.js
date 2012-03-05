(function($){

//DEVELOPMENT!!!!!!!!!!!!!!!!!!!!
//window.hansel = {
//PROD!!!!!!!!!!!!!!!!!!!!!!!!!!
var hansel = {


  //Event hijacking so we can cathc events that doesn't bubbles up to the window
  hijackEventListener: function() {
    var that = this;
    var _interfaces = [
                        HTMLAnchorElement,
                        HTMLAreaElement,
                        HTMLBaseElement,
                        HTMLBodyElement,
                        HTMLBRElement,
                        HTMLButtonElement,
                        HTMLDirectoryElement,
                        HTMLDivElement,
                        HTMLDListElement,
                        HTMLDocument,
                        HTMLFieldSetElement,
                        HTMLFontElement,
                        HTMLFormElement,
                        HTMLFrameElement,
                        HTMLFrameSetElement,
                        HTMLHeadElement,
                        HTMLHeadingElement,
                        HTMLHRElement,
                        HTMLHtmlElement,
                        HTMLIFrameElement,
                        HTMLImageElement,
                        HTMLInputElement,
                        HTMLLabelElement,
                        HTMLLegendElement,
                        HTMLLIElement,
                        HTMLLinkElement,
                        HTMLMapElement,
                        HTMLMenuElement,
                        HTMLMetaElement,
                        HTMLObjectElement,
                        HTMLOListElement,
                        HTMLOptGroupElement,
                        HTMLOptionElement,
                        HTMLParagraphElement,
                        HTMLPreElement,
                        HTMLQuoteElement,
                        HTMLSelectElement,
                        HTMLSpanElement,
                        HTMLStyleElement,
                        HTMLTableCaptionElement,
                        HTMLTableCellElement,
                        HTMLTableColElement,
                        HTMLTableElement,
                        HTMLTableRowElement,
                        HTMLTableSectionElement,
                        HTMLTextAreaElement,
                        HTMLTitleElement,
                        HTMLUListElement
                      ];
    var i;

    for (i = 0; i < _interfaces.length; i++) {
        _interfaces[i].prototype.customAddEventListener = _interfaces[i].prototype.addEventListener;
        _interfaces[i].prototype.addEventListener = that.functionWrapper(_interfaces[i].prototype.addEventListener, function(){
          this.customAddEventListener(arguments[0], function() {
            // console.log(this);
            // console.log(arguments);
            debugger
            if(this == arguments[0].target){
              that.reportIn(arguments[0]);
            }
          }, false);
        });
    }
  },

  functionWrapper: function (functionToWrap, before, after, thisObject) {
    return function () {
      var args = Array.prototype.slice.call(arguments),
          result;
      if (before) before.apply(thisObject || this, args);
      result = functionToWrap.apply(thisObject || this, args);
      if (after) after.apply(thisObject || this, args);
      return result;
    };
  },
  reportIn: function(ev) {
    console.log('reportandome');
    console.log(ev.target);
    //this.pushToStack(ev);
  }
};
//init
hansel.hijackEventListener();

})(jQuery);



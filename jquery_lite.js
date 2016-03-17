;(function (root) {

  root.$l = function (jqArg) {
		if (jqArg instanceof HTMLElement) {
			return new DOMNodeCollection([jqArg]);
		}

		if (typeof jqArg === 'string') {
			// jqArg is CSS tag or HTML string
      // assuming for the moment they're always CSS...
			var found = root.document.querySelectorAll(jqArg);
			found = Array.prototype.slice.call(found);
			return new DOMNodeCollection(found);
		}


	};

	function DOMNodeCollection(elements) {
		this.elements = Array.prototype.slice.call(elements);
	}

	DOMNodeCollection.prototype.html = function (htmlArg) {
		if (htmlArg === undefined) {
			return this.elements[0].innerHTML;
		} else {
			for (var i = 0; i < this.elements.length; i++) {
				this.elements[i].innerHTML = htmlArg;
			}
		}
	};

	DOMNodeCollection.prototype.empty = function () {
		this.html("");
	};

	DOMNodeCollection.prototype.append = function (arg) {
		var i, j;
    if (arg instanceof HTMLElement) {
			for (i = 0; i < this.elements.length; i++) {
				this.elements[i].innerHTML += arg.outerHTML;
			}
		} else if (arg instanceof DOMNodeCollection) {
			for (i = 0; i < this.elements.length; i++) {
				for (j = 0; j < arg.elements.length; j++) {
					this.elements[i].innerHTML += arg.elements[j].outerHTML;
				}
			}
		} else if (typeof arg === 'string') {
      for (i = 0; i < this.elements.length; i++) {
				this.elements[i].innerHTML += arg;
			}
		}
	};

	DOMNodeCollection.prototype.attr = function (attrName, value) {
		if (value === undefined) {
			return this.elements[0].getAttribute(attrName);
		} else {
			for (var i = 0; i < this.elements.length; i++) {
				this.elements[i].setAttribute(attrName, value);
			}
		}
	};

	DOMNodeCollection.prototype.addClass = function (className) {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].classList.add(className);
		}
	};

	DOMNodeCollection.prototype.removeClass = function (className) {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].classList.remove(className);
		}
	};

	DOMNodeCollection.prototype.children = function (selector) {
		var children = [];
		for (var i = 0; i < this.elements.length; i++) {
			var subChild = Array.prototype.slice.call(this.elements[i].children);
			for (var j = 0; j < subChild.length; j++) {
				if (subChild[j].matches(selector) || selector === undefined) {
					children.push(subChild[j]);
				}
			}
		}
    return new DOMNodeCollection(children);
	};

	DOMNodeCollection.prototype.parent = function (selector) {
		var parents = [];
		for (var i = 0; i < this.elements.length; i++) {
			var elemParent = this.elements[i].parentNode;
			if (elemParent.matches(selector) || selector === undefined) {
				parents.push(elemParent);
			}
		}
    return new DOMNodeCollection(parents);
	};

	DOMNodeCollection.prototype.find = function (selector) {
    var found = [];
		for (var i = 0; i < this.elements.length; i++) {
			var elems = Array.prototype.slice.call(this.elements[i].querySelectorAll(selector));
			found = found.concat(elems);
		}
		return new DOMNodeCollection(found);
	};

	DOMNodeCollection.prototype.remove = function (selector) {
    for (var i = 0; i < this.elements.length; i++) {
			if (this.elements[i].matches(selector) || selector === undefined) {
				this.elements[i].remove();
			}
		}
	};







})(this);

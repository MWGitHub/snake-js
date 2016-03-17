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
		this.elements = elements;
	}





})(this);

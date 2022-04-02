var d = document;
var bf = {
	code: {
		// set up an array of values from 8 to 128, by 8s
		base: '++++++++[>+>++>+++>++++>+++++>++++++>+++++++>++++++++>+++++++++>++++++++++>+++++++++++>++++++++++++>+++++++++++++>++++++++++++++>+++++++++++++++>++++++++++++++++<<<<<<<<<<<<<<<<-]',
		slot: {
			increment: '>',
			decrement: '<'
		},
		pointer: {
			increment: '+',
			decrement: '-'
		},
		output: '.'
	},
	fuckit: function () {
		make_code = function (c) {
			// make the bf code for this character
			var char_code = '';
			// set the slot
			var slot = Math.round(c / 8);
			for (var i = 0; i < slot; i++) {
				char_code += bf.code.slot.increment;
			}
			// set the pointer
			if (c > (slot * 8)) {
				var pointer_diff = c - (slot * 8);
				var pointer = bf.code.pointer.increment;
				var pointer_reversed = bf.code.pointer.decrement;
			} else if (c < (slot * 8)) {
				var pointer_diff = (slot * 8) - c;
				var pointer = bf.code.pointer.decrement;
				var pointer_reversed = bf.code.pointer.increment;
			} else {
				var pointer_diff = 0;
			}
			for (var i = 0; i < pointer_diff; i++) {
				char_code += pointer;
			}
			// output the character
			char_code += bf.code.output;
			// reset the pointer
			for (var i = 0; i < pointer_diff; i++) {
				char_code += pointer_reversed;
			}
			// reset the slot
			for (var i = 0; i < slot; i++) {
				char_code += bf.code.slot.decrement;
			}
			// return our bf code
			return char_code;
		}
		var code = bf.code.base;
		var txt2fck = d.getElementById('txt2fck').value;
		for (var i = 0; i < txt2fck.length; i++) {
			code += make_code(txt2fck.charCodeAt(i));
		}
		code += bf.code.output;
		d.getElementById('brainf_ckcode').value = code;
	}
};
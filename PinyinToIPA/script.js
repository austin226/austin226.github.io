function PinyinIPA() {
};

PinyinIPA.prototype.process = function(input) {
	// Break down the input into syllables
	
	// Feed each syllable into the IPA converter
};

PinyinIPA.prototype.convertSyllable = function(syllable) {
	
	
	var ipa;
	// Handle special cases
	if (syllable == 'weng') {
		ipa = 'w&#612;&#331;';
	} else {
		// Break down syllable into initial and final
		// TODO
		
		var centralI = ['z', 'c', 's', 'zh', 'ch', 'sh', 'r'];
		
		
		// Convert initial
		ipa = this.convertInitial(init);
		
		// Convert final
		var isCentralI = centralI.includes(init);
		ipa += this.convertFinal(fin, isCentralI);
		
		// TODO handle erhua
	}
};

PinyinIPA.prototype.convertInitial = function(pinyin) {
	// Converts a pinyin initial consonant to its IPA equivalent
	// Returns null if invalid
	switch (pinyin) {
	case 'b':
		return 'p';
	case 'p':
		return 'p&#688;'; // Aspirated [p]
	case 'm':
		return 'm';
	case 'f':
		return 'f';
	case 'd':
		return 't';
	case 't':
		return 't&#688;'; // Aspirated [t]
	case 'n':
		return 'n';
	case 'l':
		return 'l';
	case 'g':
		return 'k';
	case 'k':
		return 'k&#688;'; // Aspirated [k]
	case 'h':
		return 'x';
	case 'z':
		return 't&#860;s';
	case 'c':
		return 't&#860;s&#688;'; // Aspirated [ts]
	case 's':
		return 's';
	case 'zh':
		return 't&#860;&#642;'; // [t] + Retroflex [s]
	case 'ch':
		return 't&#860;&#642;&#688;'; // [t] + Aspirated Retroflex [s]
	case 'sh':
		return '&#642;'; // Retroflex [s]
	case 'r':
		return '&#635;'; // Retroflex [r]
	case 'j':
		return 't&#860;&#597;'; // t + Palatal [s]
	case 'q':
		return 't&#860;&#597;&#688;'; // t + Aspirated Palatal [s]
	case 'x':
		return '&#597;'; // Palatal [s]
	default:
		return null;
	}
};

PinyinIPA.prototype.convertFinal = function(init, fin, isCentralI) {
	// Converts a pinyin final medial/nucleus/coda combination to its IPA equivalent
	// Returns null if invalid
	
	switch(fin) {
		case 'a':
			if (!this.valid(init, ['r', 'j', 'q', 'x'])) return null; // TODO validate all finals
			if (init == 'y') return 'j&auml;';
			return '&auml;';
		case 'ai':
			return 'a&#618;&#815';
		case 'an':
			if (init == 'y') return 'j&#603;n';
			return 'an';
		case 'ang':
			return 'a&#331;';
		case 'ao':
			return '&#593;&#650;&#815;';
		case 'e':
			if (init == 'y') return 'j&#603;';
			return '&#612;';
		case 'ei':
			return 'e&#618;&#815;';
		case 'en':
			return '&#601;n';
		case 'eng':
			return '&#601;&#331;';
		case 'i':
			if (isCentralI) {
				return '&#616;';
			} else {
				return 'i';
			}
		case 'ia':
			return 'j
	};
};

PinyinIPA.prototype.valid = function(init, invalidInits) {
	// Returns false if init is invalid
	return !(invalidInits.includes(init));
}
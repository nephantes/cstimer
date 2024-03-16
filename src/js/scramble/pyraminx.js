"use strict";

(function() {
	/*
	x504x x x504x
	 132 231 132
	  x x405x x
	    x504x
	     132
	      x  */
	var cFacelet = [
		[3, 16, 11], // F3, L4, R5
		[4, 23, 15], // F4, D5, L3
		[5, 9, 22], // F5, R3, D4
		[10, 17, 21] // R4, L5, D3
	];

	var eFacelet = [
		[1, 7], // F1, R1
		[2, 14], // F2, L2
		[0, 18], // F0, D0
		[6, 12], // R0, L0
		[8, 20], // R2, D2
		[13, 19] // L1, D1
	];

	function checkNoBar(perm, ori) {
		var edgeOri = eocoord.set([], ori & 0x1f);
		var cornOri = cocoord.set([], ori >> 5);
		var edgePerm = epcoord.set([], perm);
		var f = [];
		mathlib.fillFacelet(cFacelet, f, [0, 1, 2, 3], cornOri, 6);
		mathlib.fillFacelet(eFacelet, f, edgePerm, edgeOri, 6);
		var pieces = [4, 2, 3, 1, 5, 0];
		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 2; j++) {
				var p1 = eFacelet[i][0 ^ j];
				var p2 = eFacelet[i][1 ^ j];
				var nb1 = ~~(p1 / 6) * 6 + pieces[(pieces.indexOf(p1 % 6) + 5) % 6];
				var nb2 = ~~(p2 / 6) * 6 + pieces[(pieces.indexOf(p2 % 6) + 1) % 6];
				if (f[nb1] == f[p1] && f[nb2] == f[p2]) {
					return false;
				}
			}
		}
		return true;
	}

	var solv = new mathlib.Solver(4, 2, [
		[0, [epermMove, 'p', 6, -1], 360],
		[0, oriMove, 2592]
	]);

	var movePieces = [
		[0, 1, 3],
		[1, 2, 5],
		[0, 4, 2],
		[3, 5, 4]
	];

	var moveOris = [
		[0, 1, 0, 2],
		[0, 1, 0, 2],
		[0, 0, 1, 2],
		[0, 0, 1, 2]
	];

	function epermMove(arr, m) {
		mathlib.acycle(arr, movePieces[m]);
	}

	var eocoord = new mathlib.coord('o', 6, -2);
	var epcoord = new mathlib.coord('p', 6, -1);
	var cocoord = new mathlib.coord('o', 4, 3);

	function oriMove(a, c) {
		var edgeOri = eocoord.set([], a & 0x1f);
		var cornOri = cocoord.set([], a >> 5);
		cornOri[c]++;
		mathlib.acycle(edgeOri, movePieces[c], 1, moveOris[c]);
		return cocoord.get(cornOri) << 5 | eocoord.get(edgeOri);
	}

	function pyrMult(state0, state1) {
		var ep0 = epcoord.set([], state0[0]);
		var eo0 = eocoord.set([], state0[1] & 0x1f);
		var co0 = cocoord.set([], state0[1] >> 5);
		var ep1 = epcoord.set([], state1[0]);
		var eo1 = eocoord.set([], state1[1] & 0x1f);
		var co1 = cocoord.set([], state1[1] >> 5);
		var ep2 = [];
		var eo2 = [];
		var co2 = [];
		for (var i = 0; i < 6; i++) {
			ep2[i] = ep0[ep1[i]];
			eo2[i] = eo0[ep1[i]] ^ eo1[i];
		}
		for (var i = 0; i < 4; i++) {
			co2[i] = co0[i] + co1[i];
		}
		return [epcoord.get(ep2), cocoord.get(co2) << 5 | eocoord.get(eo2)];
	}

	var aufs = [[0, 0], [183, 869], [87, 1729]];

	var l4e_map = [
		//[ 0, 1, '1'],
		[ 1, 3, 'L3Bar-1', 'LLDGFFRRG'],
		[59, 3, 'L3Bar-2', 'DLLGFFRRG'],
		[25, 3, 'L3Bar-3', 'FFGDRRLLG'],
		[35, 3, 'L3Bar-4', 'GRRGLLFFD'],
		[12, 3, 'LL-1',    'LLGFFGGGG'],
		[10, 3, 'LL-2',    'GLLGGGGRR'],
		[ 2, 1, 'LL-3',    'RLRLFLFRF'],
		[ 4, 1, 'LL-4',    'FLFRFRLRL'],
		[ 3, 3, 'L4NB-1',  'FGGGGDGFGGGF'],
		[57, 3, 'L4NB-2',  'GGRGRGDGGGGR'],
		[53, 3, 'L4NB-3',  'GGDGRGGGRGGR'],
		[45, 3, 'L4NB-4',  'DGGFGGGFGGGF'],
		[33, 3, 'L4NB-5',  'GGDGGGGRGGGR'],
		[27, 3, 'L4NB-6',  'DGGGFGGGGGGF'],
		[49, 3, 'L3NB-1',  'RRGGGDGFF'],
		[43, 3, 'L3NB-2',  'GFFRRGDGG'],
		[41, 3, 'L3NB-3',  'GGGDLLFFG'],
		[51, 3, 'L3NB-4',  'GGGGRRLLD'],
		[ 8, 3, 'Flip-1',  'RLFLFFRRL'],
		[16, 3, 'Flip-2',  'LFFRRRLLFGGD'],
		[56, 1, 'Flip-3',  'RLFLFRFRLGGD'],
		[21, 3, 'L4Blk-1', 'GGDGGGLLL'],
		[13, 3, 'L4Blk-2', 'DGGLLLGGG'],
		[29, 3, 'L4Bar-1', 'GGGDGGGRR'],
		[37, 3, 'L4Bar-2', 'GGGFFGGGD'],
		[61, 3, 'L4Bar-3', 'GGGDGGLLG'],
		[ 5, 3, 'L4Bar-4', 'GGGGLLGGD'],
		[17, 3, 'L4Bar-5', 'GGGLLDGGG'],
		[11, 3, 'L4Bar-6', 'GGGGGGDLL'],
		[ 9, 3, 'L4Bar-7', 'RRGDGGGGG'],
		[19, 3, 'L4Bar-8', 'GFFGGGGGD'],
		[20, 3, 'DFlip-1', 'GGGRRGGGGGGD'],
		[18, 3, 'DFlip-2', 'GGGGGGGFFGGD'],
		[60, 1, 'DFlip-3', 'FFGRRGLLGGGD'],
		[58, 1, 'DFlip-4', 'GRRGLLGFFGGD']
	];

	var l4eprobs = [];
	var l4efilter = [];
	for (var i = 0; i < l4e_map.length; i++) {
		l4eprobs.push(l4e_map[i][1]);
		l4efilter.push(l4e_map[i][2]);
	}

	function getL4EScramble(type, length, cases) {
		var l4ecase = l4e_map[scrMgr.fixCase(cases, l4eprobs)][0];
		var perm = mathlib.get8Perm(mathlib.set8Perm([], l4ecase & 1, 4, -1).concat([4, 5]), 6, -1);
		var ori = (l4ecase >> 1 & 0x3) * 864 + (l4ecase >> 3);
		var state = pyrMult(mathlib.rndEl(aufs), pyrMult([perm, ori], mathlib.rndEl(aufs)));
		var sol = solv.toStr(solv.search(state, 8).reverse(), "ULRB", ["'", ""]) + ' ';
		for (var i = 0; i < 4; i++) {
			var r = mathlib.rn(3);
			if (r < 2) {
				sol += "lrbu".charAt(i) + [" ", "' "][r];
			}
		}
		return sol;
	}

	function getL4EImage(cases, canvas) {
		var l4ecase = l4e_map[cases];
		if (!canvas) {
			return ['GGG' + l4ecase[3], null, l4ecase[2]];
		}
		image.pyrllImage('GGG' + l4ecase[3], canvas);
	}

	function getScramble(type) {
		var minl = type == 'pyro' ? 0 : 8;
		var limit = type == 'pyrl4e' ? 2 : 7;
		var len = 0;
		var sol;
		var perm;
		var ori;
		do {
			if (type == 'pyro' || type == 'pyrso' || type == 'pyr4c') {
				perm = mathlib.rn(360);
				ori = mathlib.rn(2592);
			} else if (type == 'pyrl4e') {
				perm = mathlib.get8Perm(mathlib.set8Perm([], mathlib.rn(12), 4, -1).concat([4, 5]), 6, -1);
				ori = mathlib.rn(3) * 864 + mathlib.rn(8);
			} else if (type == 'pyrnb') {
				do {
					perm = mathlib.rn(360);
					ori = mathlib.rn(2592);
				} while (!checkNoBar(perm, ori));
			}
			len = solv.search([perm, ori], 0).length;
			sol = solv.toStr(solv.search([perm, ori], minl).reverse(), "ULRB", ["'", ""]) + ' ';
			for (var i = 0; i < 4; i++) {
				var r = mathlib.rn(type == 'pyr4c' ? 2 : 3);
				if (r < 2) {
					sol += "lrbu".charAt(i) + [" ", "' "][r];
					len++;
				}
			}
		} while (len < limit);
		return sol;
	}
	scrMgr.reg(['pyro', 'pyrso', 'pyrnb', 'pyr4c'], getScramble)
		('pyrl4e', getL4EScramble, [l4efilter, l4eprobs, getL4EImage]);
})();

var mpyr = (function() {
	/*
	XX L0 L1 L2 L3 L4 XX    XX R0 R1 R2 R3 R4 XX
	   L5 L6 L7 L8 L9    XX    R5 R6 R7 R8 R9
	      La Lb Lc    Fc Fb Fa    Ra Rb Rc
	         XX    F9 F8 F7 F6 F5    XX
	            XX F4 F3 F2 F1 F0 XX
	            XX D0 D1 D2 D3 D4 XX
	               D5 D6 D7 D8 D9
	                  Da Db Dc
	                     XX
	 */

	function MpyrCubie(ep, eo, wp, ct, co, cp) {
		this.ep = ep || [0, 1, 2, 3, 4, 5];
		this.eo = eo || [0, 0, 0, 0, 0, 0];
		this.wp = wp || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
		this.ct = ct || [0, 1, 2, 3];
		this.co = co || [0, 0, 0, 0];
		this.cp = cp || [0, 1, 2, 3]; // for cube rotation
	}

	var F = 0, R = 13, D = 26, L = 39, a = 10, b = 11, c = 12;

	var edgeFacelets = [
		[F + 8, L + 8], [D + 8, R + 8],
		[F + 6, R + 6], [D + 6, L + 6],
		[F + 2, D + 2], [R + 2, L + 2]
	];

	var wingFacelets = [
		[F + 9, L + c], [L + 9, F + c], [D + 9, R + c], [R + 9, D + c],
		[F + a, R + 5], [R + a, F + 5], [D + a, L + 5], [L + a, D + 5],
		[F + 1, D + 3], [D + 1, F + 3], [R + 1, L + 3], [L + 1, R + 3]
	];

	var cornFacelets = [
		[F + 0, R + b, D + 4],
		[D + 0, L + b, F + 4],
		[R + 0, F + b, L + 4],
		[L + 0, D + b, R + 4]
	];

	var centFacelets = [
		F + 7, D + 7, R + 7, L + 7
	];

	MpyrCubie.prototype.toFaceCube = function(todiv) {
		var f = [];
		todiv = todiv || 13;
		for (var i = 0; i < 6; i++) {
			var j = this.ep[i];
			var ori = this.eo[i];
			for (var n = 0; n < 2; n++) {
				f[edgeFacelets[i][n ^ ori]] = ~~(edgeFacelets[j][n] / todiv);
			}
		}
		for (var i = 0; i < 12; i++) {
			for (var n = 0; n < 2; n++) {
				f[wingFacelets[i][n]] = ~~(wingFacelets[this.wp[i]][n] / todiv);
			}
		}
		for (var i = 0; i < 4; i++) {
			var j = this.cp[i];
			var ori = this.co[i];
			for (var n = 0; n < 3; n++) {
				f[cornFacelets[i][(n + ori) % 3]] = ~~(cornFacelets[j][n] / todiv);
			}
			f[centFacelets[i]] = ~~(centFacelets[this.ct[i]] / todiv);
		}
		return f;
	}

	MpyrCubie.prototype.fromFacelet = function(facelet) {
		var count = 0;
		var f = [];
		for (var i = 0; i < 52; ++i) {
			f[i] = facelet[i];
			count += Math.pow(16, f[i]);
		}
		if (count != 0xdddd) {
			return -1;
		}
		for (var i = 0; i < 6; i++) {
			out: for (var j = 0; j < 6; j++) {
				for (var t = 0; t < 2; t++) {
					if (~~(edgeFacelets[j][0] / 13) == f[edgeFacelets[i][t]] &&
							~~(edgeFacelets[j][1] / 13) == f[edgeFacelets[i][t ^ 1]]) {
						this.ep[i] = j;
						this.eo[i] = t;
						break out;
					}
				}
			}
		}
		for (var i = 0; i < 12; i++) {
			for (var j = 0; j < 12; j++) {
				if (~~(wingFacelets[j][0] / 13) == f[wingFacelets[i][0]] &&
						~~(wingFacelets[j][1] / 13) == f[wingFacelets[i][1]]) {
					this.wp[i] = j;
					break;
				}
			}
		}
		for (var i = 0; i < 4; i++) {
			out: for (var j = 0; j < 4; j++) {
				for (var t = 0; t < 3; t++) {
					if (~~(cornFacelets[j][0] / 13) == f[cornFacelets[i][t]] &&
							~~(cornFacelets[j][1] / 13) == f[cornFacelets[i][(t + 1) % 3]] &&
							~~(cornFacelets[j][2] / 13) == f[cornFacelets[i][(t + 2) % 3]]) {
						this.cp[i] = j;
						this.co[i] = t;
						break out;
					}
				}
			}
		}
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (~~(centFacelets[j] / 13) == f[centFacelets[i]]) {
					this.ct[i] = j;
				}
			}
		}
		return this;
	}

	MpyrCubie.prototype.toString = function() {
		var f = this.toFaceCube(1);
		var ret = '' +
			'XX L0 L1 L2 L3 L4 XX    XX R0 R1 R2 R3 R4 XX\n' +
			'   L5 L6 L7 L8 L9    XX    R5 R6 R7 R8 R9\n' +
			'      La Lb Lc    Fc Fb Fa    Ra Rb Rc\n' +
			'         XX    F9 F8 F7 F6 F5    XX\n' +
			'            XX F4 F3 F2 F1 F0 XX\n' +
			'            XX D0 D1 D2 D3 D4 XX\n' +
			'               D5 D6 D7 D8 D9\n' +
			'                  Da Db Dc\n' +
			'                     XX';
		ret = ret.replace(/([FRDL])([0-9a-c])/g, function(m, p1, p2) {
			var i = 'FRDL'.indexOf(p1) * 13 + parseInt(p2, 16);
			return 'FRDL'[~~(f[i] / 13)] + (f[i] % 13).toString(16);
		});
		return ret;
	}

	MpyrCubie.randomCube = function(rn) {
		rn = rn || function(n) {
			return ~~(Math.random() * n);
		}

		function rndEvenPerm(n) {
			var ret = [];
			for (var i = 0; i < n; i++) {
				ret[i] = i;
			}
			var parity = 0;
			for (var i = 0; i < n - 1; i++) {
				var swap = rn(n - i);
				if (swap != 0) {
					var tmp = ret[i]; ret[i] = ret[i + swap]; ret[i + swap] = tmp;
					parity ^= 1;
				}
			}
			if (parity) {
				var tmp = ret[0]; ret[0] = ret[1]; ret[1] = tmp;
			}
			return ret;
		}

		var ret = new MpyrCubie(rndEvenPerm(6), null,
			rndEvenPerm(12), rndEvenPerm(4), null, null)
		var parity = 0;
		for (var i = 0; i < 5; i++) {
			ret.eo[i] = rn(2);
			parity += ret.eo[i];
		}
		ret.eo[5] = parity & 1;
		parity = 0;
		for (var i = 0; i < 3; i++) {
			ret.co[i] = rn(3);
			parity += 3 - ret.co[i];
		}
		ret.co[3] = parity % 3;
		return ret;
	}

	MpyrCubie.MpyrMult = function() {
		var prod = arguments[arguments.length - 1] || new MpyrCubie();
		for (var k = 0; k < arguments.length; k++) {
			var a = arguments[arguments.length - 1 - k];
			for (var i = 0; i < 4; i++) {
				prod.ct[i] = k == 0 ? i : (a.ct[prod.ct[i]]);
				prod.co[i] = k == 0 ? 0 : ((a.co[prod.cp[i]] + prod.co[i]) % 3);
				prod.cp[i] = k == 0 ? i : (a.cp[prod.cp[i]]);
			}
			for (var i = 0; i < 6; i++) {
				prod.eo[i] = k == 0 ? 0 : (a.eo[prod.ep[i]] ^ prod.eo[i]);
				prod.ep[i] = k == 0 ? i : (a.ep[prod.ep[i]]);
			}
			for (var i = 0; i < 12; i++) {
				prod.wp[i] = k == 0 ? i : (a.wp[prod.wp[i]]);
			}
		}
		return prod;
	}

	function initMoveCube() {
		if (MpyrCubie.moveCube) {
			return;
		}
		// var moveUv = new MpyrCubie([2, 3, 5, 4, 1, 0], [1, 0, 0, 1, 1, 1], [5, 4, 6, 7, 10, 11, 9, 8, 3, 2, 1, 0], [2, 1, 3, 0], [1, 1, 1, 1], [3, 0, 2, 1]);
		// var moveRv = new MpyrCubie([3, 2, 4, 5, 1, 0], [0, 1, 1, 0, 0, 0], [6, 7, 5, 4, 9, 8, 10, 11, 2, 3, 0, 1], [1, 2, 0, 3], [1, 1, 1, 1], [0, 3, 1, 2]);
		var moveCube = [];
		moveCube[0] = new MpyrCubie( //moveU
			[0, 1, 2, 3, 4, 5], [0, 0, 0, 0, 0, 0],
			[0, 4, 2, 3, 10, 5, 6, 7, 8, 9, 1, 11],
			[0, 1, 2, 3], [0, 0, 1, 0], null);
		moveCube[2] = new MpyrCubie( //moveUw
			[2, 1, 5, 3, 4, 0], [1, 0, 0, 0, 0, 1],
			[5, 4, 2, 3, 10, 11, 6, 7, 8, 9, 1, 0],
			[2, 1, 3, 0], [0, 0, 1, 0], null);
		moveCube[4] = new MpyrCubie( //moveB
			[0, 1, 2, 3, 4, 5], [0, 0, 0, 0, 0, 0],
			[0, 1, 2, 6, 4, 5, 11, 7, 8, 9, 10, 3],
			[0, 1, 2, 3], [0, 0, 0, 1], null);
		moveCube[6] = new MpyrCubie( //moveBw
			[0, 3, 2, 5, 4, 1], [0, 1, 0, 1, 0, 0],
			[0, 1, 7, 6, 4, 5, 11, 10, 8, 9, 2, 3],
			[0, 3, 1, 2], [0, 0, 0, 1], null);
		moveCube[8] = new MpyrCubie( //moveR
			[0, 1, 2, 3, 4, 5], [0, 0, 0, 0, 0, 0],
			[0, 1, 5, 3, 4, 8, 6, 7, 2, 9, 10, 11],
			[0, 1, 2, 3], [1, 0, 0, 0], null);
		moveCube[10] = new MpyrCubie( //moveRw
			[0, 2, 4, 3, 1, 5], [0, 1, 1, 0, 0, 0],
			[0, 1, 5, 4, 9, 8, 6, 7, 2, 3, 10, 11],
			[1, 2, 0, 3], [1, 0, 0, 0], null);
		moveCube[12] = new MpyrCubie( //moveL
			[0, 1, 2, 3, 4, 5], [0, 0, 0, 0, 0, 0],
			[7, 1, 2, 3, 4, 5, 6, 9, 8, 0, 10, 11],
			[0, 1, 2, 3], [0, 1, 0, 0], null);
		moveCube[14] = new MpyrCubie( //moveLw
			[3, 1, 2, 4, 0, 5], [1, 0, 0, 0, 1, 0],
			[7, 6, 2, 3, 4, 5, 8, 9, 1, 0, 10, 11],
			[3, 0, 2, 1], [0, 1, 0, 0], null);
		for (var i = 1; i < 16; i += 2) {
			moveCube[i] = MpyrCubie.MpyrMult(moveCube[i - 1], moveCube[i - 1], null);
		}
		MpyrCubie.moveCube = moveCube;
	}

	initMoveCube();

	MpyrCubie.prototype.getPairPerm = function() {
		var objw = [];
		var ret = [];
		for (var i = 0; i < 6; i++) {
			var ori = this.eo[i];
			objw[this.ep[i] * 2] = i * 2 + ori;
			objw[this.ep[i] * 2 + 1] = i * 2 + (ori ^ 1);
		}
		for (var i = 0; i < 12; i++) {
			ret[i] = objw[this.wp[i]];
		}
		return ret;
	}

	MpyrCubie.prototype.getCosetIdx = function() {
		var ret = 0;
		for (var i = 0; i < 4; i++) {
			ret += this.co[i];
		}
		ret += 3 - this.ct[3 ^ this.ct.indexOf(3)];
		return ret % 3;
	}

	function genCkmv(moves) {
		var ckmv = [];
		var tmp1 = new MpyrCubie();
		var tmp2 = new MpyrCubie();
		for (var m1 = 0; m1 < moves.length; m1++) {
			ckmv[m1] = 1 << m1;
			for (var m2 = 0; m2 < m1; m2++) {
				MpyrCubie.MpyrMult(MpyrCubie.moveCube[moves[m1]], MpyrCubie.moveCube[moves[m2]], tmp1);
				MpyrCubie.MpyrMult(MpyrCubie.moveCube[moves[m2]], MpyrCubie.moveCube[moves[m1]], tmp2);
				if (tmp1.toString(1) == tmp2.toString(1)) {
					ckmv[m1] |= 1 << m2;
				}
			}
		}
		return ckmv;
	}

	function genCombParams(ccnts) {
		var thres = [];
		for (var j = 0; j < ccnts.length; j++) {
			thres[j] = ~~thres[j - 1] + ccnts[j];
		}
		var n = thres[thres.length - 1];
		var weight = [];
		weight[ccnts.length - 1] = 1;
		for (var j = ccnts.length - 2; j >= 0; j--) {
			weight[j] = weight[j + 1] * mathlib.Cnk[n - thres[j]][ccnts[j + 1]];
		}
		var params = {};
		params.n = n;
		params.weight = weight;
		params.thres = thres;
		params.ccnts = ccnts;
		return params;
	}

	function getCombs(arr, params, perms) {
		var n = params.n;
		var ccnts = params.ccnts.slice();
		var thres = params.thres;
		var weight = params.weight;
		var idxComb = 0;
		for (var i = n - 1; i >= 0; i--) {
			var s = i;
			for (var j = 0; j < ccnts.length; j++) {
				if (arr[i] >= thres[j]) {
					s -= ccnts[j];
					continue;
				}
				idxComb += mathlib.Cnk[s][ccnts[j]--] * weight[j];
				if (perms && perms[j]) {
					perms[j][ccnts[j]] = arr[i];
				}
				break;
			}
		}
		return idxComb;
	}

	function setCombs(arr, params, idxComb) {
		var n = params.n;
		var ccnts = params.ccnts.slice();
		var thres = params.thres;
		var weight = params.weight;
		var fill = n - 1;
		var idxs = [];
		for (var j = ccnts.length - 2; j >= 0; j--) {
			var size = mathlib.Cnk[n - thres[j]][ccnts[j + 1]];
			idxs[j + 1] = idxComb % size;
			idxComb = ~~(idxComb / size);
		}
		idxs[0] = idxComb;
		for (var i = n - 1; i >= 0; i--) {
			var s = i;
			arr[i] = -1;
			for (var j = 0; j < ccnts.length; j++) {
				var cmp = mathlib.Cnk[s][ccnts[j]];
				if (idxs[j] >= cmp) {
					idxs[j] -= cmp;
					arr[i] = (--ccnts[j]) + ~~thres[j - 1];
					break;
				}
				s -= ccnts[j];
			}
			if (arr[i] == -1) {
				arr[i] = fill--;
			}
		}
		return arr;
	}

	function createMoveTable(initState, validMoves, hashFunc, moveFunc) {
		var states = [initState];
		var hash2idx = {};
		var depthEnds = [];
		hash2idx[hashFunc(initState)] = 0;
		depthEnds[0] = 1;
		var moveTable = [];
		for (var m = 0; m < validMoves.length; m++) {
			moveTable[m] = [];
		}
		var tt = +new Date;
		for (var i = 0; i < states.length; i++) {
			if (i == depthEnds[depthEnds.length - 1]) {
				depthEnds.push(states.length);
			}
			if (i % 10000 == 9999) {
				DEBUG && console.log(i, 'states scanned, tt=', +new Date - tt);
			}
			var curState = states[i];
			for (var m = 0; m < validMoves.length; m++) {
				var newState = moveFunc(curState, validMoves[m]);
				if (!newState) {
					moveTable[m][i] = -1;
					continue;
				}
				var newHash = hashFunc(newState);
				if (!(newHash in hash2idx)) {
					hash2idx[newHash] = states.length;
					states.push(newState);
				}
				moveTable[m][i] = hash2idx[newHash];
			}
		}
		DEBUG && console.log(states.length, 'states generated, tt=', +new Date - tt, JSON.stringify(depthEnds));
		return [moveTable, hash2idx];
	}

	function doMove(mc, move) {
		return MpyrCubie.MpyrMult(mc, MpyrCubie.moveCube[move], null);
	}

	var phase1Moves = [0, 2, 4, 6, 8, 10, 12, 14];
	var p1WPrun = [];
	var solv1 = null;

	function initPhase1() {
		var combParam = genCombParams([2, 2, 2, 2, 2, 2]);
		mathlib.createPrun(p1WPrun, 0, 7484400, 5, function(idx, move) {
			var arr = setCombs([], combParam, idx);
			var mc = new MpyrCubie(null, null, arr, null, null, null);
			var mc2 = MpyrCubie.MpyrMult(mc, MpyrCubie.moveCube[phase1Moves[move]], null);
			return getCombs(mc2.getPairPerm(), combParam);
		}, 8, 2);
		var ckmv = genCkmv(phase1Moves);
		solv1 = new mathlib.Searcher(function(idx) {
			for (var i = 0; i < 12; i++) {
				if (idx[0][i] != i) {
					return false;
				}
			}
			return idx[1] == 0;
		}, function(idx) {
			return Math.min(7, mathlib.getPruning(p1WPrun, getCombs(idx[0], combParam)));
		}, function(idx, move) {
			var mc = new MpyrCubie(null, null, idx[0], null, null, null);
			var mc2 = MpyrCubie.MpyrMult(mc, MpyrCubie.moveCube[phase1Moves[move]], null);
			return [mc2.getPairPerm(), (idx[1] + 1 - (phase1Moves[move] >> 1) % 2) % 3];
		}, 8, 2, ckmv);
	}

	var phase2Moves = [2, 6, 10, 14];
	var p2epctMoves = null;
	var p2eocoMoves = null;
	var p2epctPrun = [];
	var p2eocoPrun = [];
	var solv2 = null;

	function phase2EpCtHash(fc) {
		return mathlib.get8Perm(fc.ep, 6, -1) * 4 + fc.ct.indexOf(0);
	}

	function phase2EoCoHash(fc) {
		return (parseInt(fc.eo.join(''), 2) >> 1) * 81 + parseInt(fc.co.join(''), 3);
	}

	function initPhase2() {
		p2epctMoves = createMoveTable(new MpyrCubie(), phase2Moves, phase2EpCtHash, doMove);
		p2eocoMoves = createMoveTable(new MpyrCubie(), phase2Moves, phase2EoCoHash, doMove);
		mathlib.createPrun(p2epctPrun, 0, 1440, 14, p2epctMoves[0], 4, 2);
		mathlib.createPrun(p2eocoPrun, 0, 2592, 14, p2eocoMoves[0], 4, 2);
		var ckmv2 = genCkmv(phase2Moves);
		solv2 = new mathlib.Searcher(null, function(idx) {
			return Math.max(
				mathlib.getPruning(p2epctPrun, idx[0]),
				mathlib.getPruning(p2eocoPrun, idx[1])
			);
		}, function(idx, move) {
			return [p2epctMoves[0][move][idx[0]], p2eocoMoves[0][move][idx[1]]];
		}, 4, 2, ckmv2);
	}

	function getScramble(validMoves, len) {
		var scramble = [];
		for (var i = 0; i < len; i++) {
			scramble.push(validMoves[~~(Math.random() * validMoves.length)]);
		}
		var mc = new MpyrCubie();
		for (var i = 0; i < scramble.length; i++) {
			mc = MpyrCubie.MpyrMult(mc, MpyrCubie.moveCube[scramble[i]], null);
		}
		return [mc, scramble];
	}

	var move2str = ["U", "U'", "Uw", "Uw'", "B", "B'", "Bw", "Bw'", "R", "R'", "Rw", "Rw'", "L", "L'", "Lw", "Lw'"]

	function prettyMoves(moves) {
		var buf = [];
		for (var i = 0; i < moves.length; i++) {
			buf[i] = move2str[moves[i]];
		}
		return buf.join(' ');
	}

	function applyMoves(mc, moves) {
		for (var i = 0; i < moves.length; i++) {
			mc = MpyrCubie.MpyrMult(mc, MpyrCubie.moveCube[moves[i]], null);
		}
		return mc;
	}

	function solveMpyr(mc) {
		if (!solv1) {
			initPhase1();
			initPhase2();
		}
		var tt1 = +new Date;
		var sol1 = solv1.solve([mc.getPairPerm(), mc.getCosetIdx()], 14);
		tt1 = +new Date - tt1;
		for (var i = 0; i < sol1.length; i++) {
			sol1[i] = phase1Moves[sol1[i][0]] + sol1[i][1];
		}
		mc = applyMoves(mc, sol1);
		var p2epct = p2epctMoves[1][phase2EpCtHash(mc)];
		var p2eoco = p2eocoMoves[1][phase2EoCoHash(mc)];
		var tt2 = +new Date;
		var sol2 = solv2.solve([p2epct, p2eoco], 20);
		tt2 = +new Date - tt2;
		for (var i = 0; i < sol2.length; i++) {
			sol2[i] = phase2Moves[sol2[i][0]] + sol2[i][1];
		}
		return [sol1, sol2, tt1, tt2];
	}

	function solveTest(n_moves) {
		var solvInfo = getScramble([0, 2, 4, 6, 8, 10, 12, 14], n_moves);
		var scramble = prettyMoves(solvInfo[1].slice());
		var mc = solvInfo[0];
		var ret = solveMpyr(mc);
		DEBUG && console.log('[mpyr] phase1 solved in ', ret[2]);
		DEBUG && console.log('[mpyr] phase2 solved in ', ret[3]);
		mc = applyMoves(mc, ret[0]);
		mc = applyMoves(mc, ret[1]);

		var isSolved = true;
		var f = mc.toFaceCube();
		for (var i = 0; i < 52; i += 13) {
			for (var j = i + 1; j < i + 13; j++) {
				if (f[i] != f[j]) {
					isSolved = false;
					break;
				}
			}
		}
		if (!isSolved) {
			console.log('ERROR! NOT SOLVED!');
		}
		return [ret[0].length, ret[1].length, ret[2], ret[3]];
	}


	function getRandomScramble(rn) {
		var mc = MpyrCubie.randomCube(rn);
		var sol = solveMpyr(mc);
		sol = prettyMoves([].concat(sol[0], sol[1]));
		for (var i = 0; i < 4; i++) {
			var r = rn(3);
			if (r < 2) {
				sol += " " + "lrbu".charAt(i) + ["", "'"][r];
			}
		}
		return sol;
	}

	return {
		getRandomScramble: getRandomScramble,
		solveTest: solveTest
	};
})();

scrMgr.reg('mpyrso', function() {
	return mpyr.getRandomScramble(mathlib.rn);
});

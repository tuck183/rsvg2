function Algorithms(){

	function cosine_distance(textA,textB){
		
		var numerator = 0;
		var search_terms = textA.toLowerCase().split(' ');
		var news_title = textB.toLowerCase().split(' ');
		for(var i = 0; i < search_terms.length; i++){
			for(var u = 0; u < news_title.length; u++){
				if(search_terms[i] == news_title[u]){
					numerator += 1;
				}
			}
		}
		
		var denominator = Math.sqrt(Math.abs(search_terms.length) * Math.abs(news_title.length));
		return numerator / denominator;
	}

	function sorter(a,b){
		return a.score - b.score;
	}

	return {
		cosine_distance: cosine_distance,
		sorter: sorter,

	}
}

module.exports = Algorithms();
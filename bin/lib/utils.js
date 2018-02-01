let topStories;

function minutesToMs(mn) {
	return mn*60*1000;
}

function extractUUID(link) {
	if(link !== undefined) {
		return link.apiUrl.replace('http://api.ft.com/content/', '');	
	}

	return undefined;
}

function isOpinion(annotation) {
	return (annotation.predicate === 'http://www.ft.com/ontology/classification/isClassifiedBy' && annotation.prefLabel === 'Opinion');
}

function setComparisonBase(base) {
	topStories = base;
}

function removeDuplicatesFromSection(section) {
	const tempDupes = [];
	
	for (let i = 0; i < topStories.length; ++i) { 
        for (let j = 0;  j < section.length; ++j) { 
            if (topStories[i].apiUrl === section[j].apiUrl) {
            	tempDupes.push(section[j]);
                section.splice(j, 1);
            }
        }
    }

    section = section.concat(tempDupes);
	//Re-adds duplicates at the end of the array, in case content is too short
	
	return section;
}

function setPlaceholderURL(url) {
	if(!url.startsWith('http://www.ft.com/cms/') && !url.startsWith('https://www.ft.com/video/') && !url.startsWith('http://www.ft.com/fastft/')) {
		
		if(url.startsWith('https://www.ft.com/content/')) {
			return url.split('https://www.ft.com')[1]
		}
		
		return url;
	}

	return null;
}

function sanitiseNullValues(object) {
	for (key in object) {
		if(object.hasOwnProperty(key)) {
			if(object[key] === null) {
				object[key] = 'null';
			}
		}
	}

	return object;
}

function parseNullValues(object) {
	for (key in object) {
		if(object.hasOwnProperty(key)) {
			if(object[key] === 'null') {
				object[key] = null;
			}
		}
	}

	return object;
}

function sortTime(arr, prop, dir = 'desc') {
	if(dir === 'asc') {
		arr.sort(function(a, b) {
		    return parseInt(a[prop]) - parseInt(b[prop]);
		});
	} else {
		arr.sort(function(a, b) {
		    return parseInt(b[prop]) - parseInt(a[prop]);
		});
	}
	
	return arr;
}

module.exports = {
	minutesToMs: minutesToMs,
	extractUUID: extractUUID,
	isOpinion: isOpinion,
	dedupe: removeDuplicatesFromSection,
	saveBase: setComparisonBase,
	getArticleURL: setPlaceholderURL,
	sanitiseNull: sanitiseNullValues,
	parseNull: parseNullValues,
	sort: sortTime
};
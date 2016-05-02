'use strict';

var Meta = module.parent.require('./meta');
var TopicTags = {};

var ignoredList = ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'has', 'once', 'again', 'let', 'lets', 'try'];
var adminIgnoreList = [];

TopicTags.init = function(params, callback) {
    var app = params.router;
	var	middleware = params.middleware;
	
	Meta.settings.get('topic-tags', function(err, settings) {
		if (!err && settings.ignoredWords) {
			adminIgnoreList = settings.ignoredWords.split(/[\s,]+/).join().split(",");
		}
		ignoredList = ignoredList.concat(adminIgnoreList);
	});

	app.get('/admin/plugins/topic-tags', middleware.admin.buildHeader, renderAdmin);
	app.get('/api/admin/plugins/topic-tags', renderAdmin);
		
	callback();
};

TopicTags.addTags = function(data, callback) {
    var tags = data.title.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '').replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '').split(" ");
    
    function isValidAndNotIgnored (value) {
        return ignoredList.indexOf(value.toLowerCase()) === -1 && value.length >= Meta.config.minimumTagLength && value.length <= Meta.config.maximumTagLength;
    }
        
    if (data.tags.length === 0) {
        data.tags = tags.filter(isValidAndNotIgnored);
    }
    
    callback(null, data);
};

TopicTags.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/topic-tags',
		icon: 'fa-paint-brush',
		name: 'Topic Tags'
	});

	callback(null, header);
};

function renderAdmin(req, res, next) {
	res.render('admin/plugins/topic-tags', {});
}

module.exports = TopicTags;